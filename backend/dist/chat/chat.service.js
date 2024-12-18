"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("./entities/message.entity");
const chat_room_entity_1 = require("./entities/chat-room.entity");
const users_service_1 = require("../users/users.service");
let ChatService = class ChatService {
    constructor(messageRepository, chatRoomRepository, usersService) {
        this.messageRepository = messageRepository;
        this.chatRoomRepository = chatRoomRepository;
        this.usersService = usersService;
    }
    async createChatRoom(createChatRoomDto, userId) {
        const participants = await Promise.all(createChatRoomDto.participantIds.map(id => this.usersService.findById(id)));
        const currentUser = await this.usersService.findById(userId);
        participants.push(currentUser);
        const chatRoom = this.chatRoomRepository.create({
            ...createChatRoomDto,
            participants,
        });
        return this.chatRoomRepository.save(chatRoom);
    }
    async getChatRooms(userId) {
        return this.chatRoomRepository
            .createQueryBuilder('chatRoom')
            .leftJoinAndSelect('chatRoom.participants', 'participant')
            .leftJoinAndSelect('chatRoom.messages', 'message')
            .where('participant.id = :userId', { userId })
            .orderBy('message.createdAt', 'DESC')
            .getMany();
    }
    async getChatRoomById(id, userId) {
        const chatRoom = await this.chatRoomRepository
            .createQueryBuilder('chatRoom')
            .leftJoinAndSelect('chatRoom.participants', 'participant')
            .leftJoinAndSelect('chatRoom.messages', 'message')
            .leftJoinAndSelect('message.sender', 'sender')
            .where('chatRoom.id = :id', { id })
            .orderBy('message.createdAt', 'ASC')
            .getOne();
        if (!chatRoom) {
            throw new common_1.NotFoundException('聊天室不存在');
        }
        if (!chatRoom.participants.some(p => p.id === userId)) {
            throw new common_1.ForbiddenException('您不是该聊天室的成员');
        }
        return chatRoom;
    }
    async createMessage(createMessageDto, userId) {
        const chatRoom = await this.getChatRoomById(createMessageDto.chatRoomId, userId);
        const sender = await this.usersService.findById(userId);
        const message = this.messageRepository.create({
            content: createMessageDto.content,
            sender,
            chatRoom,
        });
        return this.messageRepository.save(message);
    }
    async getMessages(chatRoomId, userId) {
        const chatRoom = await this.getChatRoomById(chatRoomId, userId);
        return this.messageRepository
            .createQueryBuilder('message')
            .leftJoinAndSelect('message.sender', 'sender')
            .where('message.chatRoomId = :chatRoomId', { chatRoomId })
            .orderBy('message.createdAt', 'ASC')
            .getMany();
    }
    async markMessagesAsRead(chatRoomId, userId) {
        await this.getChatRoomById(chatRoomId, userId);
        await this.messageRepository
            .createQueryBuilder()
            .update()
            .set({ isRead: true })
            .where('chatRoomId = :chatRoomId', { chatRoomId })
            .andWhere('senderId != :userId', { userId })
            .execute();
    }
    async markMessageAsRead(messageId, userId) {
        const message = await this.messageRepository
            .createQueryBuilder('message')
            .leftJoinAndSelect('message.chatRoom', 'chatRoom')
            .leftJoinAndSelect('chatRoom.participants', 'participant')
            .where('message.id = :messageId', { messageId })
            .getOne();
        if (!message) {
            throw new common_1.NotFoundException('消息不存在');
        }
        if (!message.chatRoom.participants.some(p => p.id === userId)) {
            throw new common_1.ForbiddenException('您不是该聊天室的成员');
        }
        if (message.sender.id === userId) {
            throw new common_1.ForbiddenException('不能标记自己的消息为已读');
        }
        message.isRead = true;
        return this.messageRepository.save(message);
    }
    async markAllMessagesAsRead(chatRoomId, userId) {
        const chatRoom = await this.getChatRoomById(chatRoomId, userId);
        await this.messageRepository
            .createQueryBuilder()
            .update()
            .set({ isRead: true })
            .where('chatRoomId = :chatRoomId', { chatRoomId })
            .andWhere('senderId != :userId', { userId })
            .execute();
    }
    async getUnreadMessageCount(userId) {
        const chatRooms = await this.getChatRooms(userId);
        const unreadCounts = {};
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
};
ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __param(1, (0, typeorm_1.InjectRepository)(chat_room_entity_1.ChatRoom)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        users_service_1.UsersService])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map