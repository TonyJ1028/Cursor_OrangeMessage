import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    createChatRoom(createChatRoomDto: CreateChatRoomDto, req: any): Promise<import("./entities/chat-room.entity").ChatRoom>;
    getChatRooms(req: any): Promise<import("./entities/chat-room.entity").ChatRoom[]>;
    getChatRoomById(id: string, req: any): Promise<import("./entities/chat-room.entity").ChatRoom>;
    createMessage(createMessageDto: CreateMessageDto, req: any): Promise<import("./entities/message.entity").Message>;
    getMessages(id: string, req: any): Promise<import("./entities/message.entity").Message[]>;
    markMessagesAsRead(id: string, req: any): Promise<{
        message: string;
    }>;
}
