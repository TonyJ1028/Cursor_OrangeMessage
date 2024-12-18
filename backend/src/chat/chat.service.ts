import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { ChatRoom } from './entities/chat-room.entity';
import { User } from '../users/user.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,
    private usersService: UsersService,
  ) {}

  async createChatRoom(createChatRoomDto: CreateChatRoomDto, userId: string): Promise<ChatRoom> {
    const participants = await Promise.all(
      createChatRoomDto.participantIds.map(id => this.usersService.findById(id)),
    );

    const currentUser = await this.usersService.findById(userId);
    participants.push(currentUser);

    const chatRoom = this.chatRoomRepository.create({
      ...createChatRoomDto,
      participants,
    });

    return this.chatRoomRepository.save(chatRoom);
  }

  async getChatRooms(userId: string): Promise<ChatRoom[]> {
    return this.chatRoomRepository
      .createQueryBuilder('chatRoom')
      .leftJoinAndSelect('chatRoom.participants', 'participant')
      .leftJoinAndSelect('chatRoom.messages', 'message')
      .where('participant.id = :userId', { userId })
      .orderBy('message.createdAt', 'DESC')
      .getMany();
  }

  async getChatRoomById(id: string, userId: string): Promise<ChatRoom> {
    const chatRoom = await this.chatRoomRepository
      .createQueryBuilder('chatRoom')
      .leftJoinAndSelect('chatRoom.participants', 'participant')
      .leftJoinAndSelect('chatRoom.messages', 'message')
      .leftJoinAndSelect('message.sender', 'sender')
      .where('chatRoom.id = :id', { id })
      .orderBy('message.createdAt', 'ASC')
      .getOne();

    if (!chatRoom) {
      throw new NotFoundException('聊天室不存在');
    }

    if (!chatRoom.participants.some(p => p.id === userId)) {
      throw new ForbiddenException('您不是该聊天室的成员');
    }

    return chatRoom;
  }

  async createMessage(createMessageDto: CreateMessageDto, userId: string): Promise<Message> {
    const chatRoom = await this.getChatRoomById(createMessageDto.chatRoomId, userId);
    const sender = await this.usersService.findById(userId);

    const message = this.messageRepository.create({
      content: createMessageDto.content,
      sender,
      chatRoom,
    });

    return this.messageRepository.save(message);
  }

  async getMessages(chatRoomId: string, userId: string): Promise<Message[]> {
    const chatRoom = await this.getChatRoomById(chatRoomId, userId);

    return this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.sender', 'sender')
      .where('message.chatRoomId = :chatRoomId', { chatRoomId })
      .orderBy('message.createdAt', 'ASC')
      .getMany();
  }

  async markMessagesAsRead(chatRoomId: string, userId: string): Promise<void> {
    await this.getChatRoomById(chatRoomId, userId);

    await this.messageRepository
      .createQueryBuilder()
      .update()
      .set({ isRead: true })
      .where('chatRoomId = :chatRoomId', { chatRoomId })
      .andWhere('senderId != :userId', { userId })
      .execute();
  }

  async markMessageAsRead(messageId: string, userId: string): Promise<Message> {
    const message = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.chatRoom', 'chatRoom')
      .leftJoinAndSelect('chatRoom.participants', 'participant')
      .where('message.id = :messageId', { messageId })
      .getOne();

    if (!message) {
      throw new NotFoundException('消息不存在');
    }

    if (!message.chatRoom.participants.some(p => p.id === userId)) {
      throw new ForbiddenException('您不是该聊天室的成员');
    }

    if (message.sender.id === userId) {
      throw new ForbiddenException('不能标记自己的消息为已读');
    }

    message.isRead = true;
    return this.messageRepository.save(message);
  }

  async markAllMessagesAsRead(chatRoomId: string, userId: string): Promise<void> {
    const chatRoom = await this.getChatRoomById(chatRoomId, userId);

    await this.messageRepository
      .createQueryBuilder()
      .update()
      .set({ isRead: true })
      .where('chatRoomId = :chatRoomId', { chatRoomId })
      .andWhere('senderId != :userId', { userId })
      .execute();
  }

  async getUnreadMessageCount(userId: string): Promise<{ [key: string]: number }> {
    const chatRooms = await this.getChatRooms(userId);
    const unreadCounts: { [key: string]: number } = {};

    for (const room of chatRooms) {
      const count = await this.messageRepository
        .createQueryBuilder('message')
        .where('message.chatRoomId = :roomId', { roomId: room.id })
        .andWhere('message.senderId != :userId', { userId })
        .andWhere('message.isRead = :isRead', { isRead: false })
        .getCount();

      unreadCounts[room.id] = count;
    }

    return unreadCounts;
  }
} 