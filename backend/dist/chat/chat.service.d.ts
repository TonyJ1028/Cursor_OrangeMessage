import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { ChatRoom } from './entities/chat-room.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { UsersService } from '../users/users.service';
export declare class ChatService {
    private messageRepository;
    private chatRoomRepository;
    private usersService;
    constructor(messageRepository: Repository<Message>, chatRoomRepository: Repository<ChatRoom>, usersService: UsersService);
    createChatRoom(createChatRoomDto: CreateChatRoomDto, userId: string): Promise<ChatRoom>;
    getChatRooms(userId: string): Promise<ChatRoom[]>;
    getChatRoomById(id: string, userId: string): Promise<ChatRoom>;
    createMessage(createMessageDto: CreateMessageDto, userId: string): Promise<Message>;
    getMessages(chatRoomId: string, userId: string): Promise<Message[]>;
    markMessagesAsRead(chatRoomId: string, userId: string): Promise<void>;
    markMessageAsRead(messageId: string, userId: string): Promise<Message>;
    markAllMessagesAsRead(chatRoomId: string, userId: string): Promise<void>;
    getUnreadMessageCount(userId: string): Promise<{
        [key: string]: number;
    }>;
}
