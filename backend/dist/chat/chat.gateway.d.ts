import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from './chat.service';
import { UsersService } from '../users/users.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { TypingEventDto, JoinRoomEventDto } from './dto/socket-event.dto';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private chatService;
    private usersService;
    private jwtService;
    server: Server;
    private connectedClients;
    constructor(chatService: ChatService, usersService: UsersService, jwtService: JwtService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    handleJoinRoom(client: Socket, data: JoinRoomEventDto): Promise<{
        status: string;
    }>;
    handleLeaveRoom(client: Socket, data: JoinRoomEventDto): Promise<{
        status: string;
    }>;
    handleSendMessage(client: Socket, createMessageDto: CreateMessageDto): Promise<{
        status: string;
        data: import("./entities/message.entity").Message;
    }>;
    handleTyping(client: Socket, data: TypingEventDto): Promise<void>;
    handleMessageRead(client: Socket, data: {
        messageId: string;
    }): Promise<{
        status: string;
    }>;
    handleMarkAllMessagesAsRead(client: Socket, data: {
        chatRoomId: string;
    }): Promise<{
        status: string;
    }>;
    handleGetUnreadCount(client: Socket): Promise<{
        status: string;
        data: {
            [key: string]: number;
        };
    }>;
    private getUserSocket;
}
