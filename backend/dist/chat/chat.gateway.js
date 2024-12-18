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
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const chat_service_1 = require("./chat.service");
const users_service_1 = require("../users/users.service");
const ws_jwt_guard_1 = require("../auth/guards/ws-jwt.guard");
const create_message_dto_1 = require("./dto/create-message.dto");
const socket_event_dto_1 = require("./dto/socket-event.dto");
const socket_event_enum_1 = require("./enums/socket-event.enum");
let ChatGateway = class ChatGateway {
    constructor(chatService, usersService, jwtService) {
        this.chatService = chatService;
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.connectedClients = new Map();
    }
    async handleConnection(client) {
        try {
            const token = client.handshake.auth.token?.split(' ')[1];
            if (!token) {
                client.emit(socket_event_enum_1.SocketEvent.UNAUTHORIZED, { message: '未授权' });
                client.disconnect();
                return;
            }
            const payload = this.jwtService.verify(token);
            const user = await this.usersService.findById(payload.sub);
            client.data.user = user;
            this.connectedClients.set(user.id, client);
            await this.usersService.updateOnlineStatus(user.id, true);
            const chatRooms = await this.chatService.getChatRooms(user.id);
            for (const room of chatRooms) {
                client.join(room.id);
                client.emit(socket_event_enum_1.SocketEvent.ROOM_JOINED, { roomId: room.id });
            }
            const statusEvent = {
                userId: user.id,
                isOnline: true,
            };
            this.server.emit(socket_event_enum_1.SocketEvent.USER_ONLINE, statusEvent);
        }
        catch (error) {
            client.emit(socket_event_enum_1.SocketEvent.ERROR, { message: error.message });
            client.disconnect();
        }
    }
    async handleDisconnect(client) {
        if (client.data.user) {
            const user = client.data.user;
            this.connectedClients.delete(user.id);
            await this.usersService.updateOnlineStatus(user.id, false);
            const statusEvent = {
                userId: user.id,
                isOnline: false,
                lastSeen: new Date(),
            };
            this.server.emit(socket_event_enum_1.SocketEvent.USER_OFFLINE, statusEvent);
        }
    }
    async handleJoinRoom(client, data) {
        try {
            const chatRoom = await this.chatService.getChatRoomById(data.roomId, client.data.user.id);
            client.join(data.roomId);
            client.emit(socket_event_enum_1.SocketEvent.ROOM_JOINED, { roomId: data.roomId });
            return { status: 'ok' };
        }
        catch (error) {
            if (error.message === '聊天室不存在') {
                throw new websockets_1.WsException({ event: socket_event_enum_1.SocketEvent.NOT_FOUND, message: error.message });
            }
            if (error.message === '您不是该聊天室的成员') {
                throw new websockets_1.WsException({ event: socket_event_enum_1.SocketEvent.FORBIDDEN, message: error.message });
            }
            throw new websockets_1.WsException({ event: socket_event_enum_1.SocketEvent.ERROR, message: error.message });
        }
    }
    async handleLeaveRoom(client, data) {
        client.leave(data.roomId);
        client.emit(socket_event_enum_1.SocketEvent.ROOM_LEFT, { roomId: data.roomId });
        return { status: 'ok' };
    }
    async handleSendMessage(client, createMessageDto) {
        try {
            const message = await this.chatService.createMessage(createMessageDto, client.data.user.id);
            const messageEvent = {
                id: message.id,
                content: message.content,
                senderId: client.data.user.id,
                senderName: client.data.user.name,
                chatRoomId: createMessageDto.chatRoomId,
                createdAt: message.createdAt,
                isRead: message.isRead,
            };
            this.server.to(createMessageDto.chatRoomId).emit(socket_event_enum_1.SocketEvent.NEW_MESSAGE, messageEvent);
            client.emit(socket_event_enum_1.SocketEvent.MESSAGE_RECEIVED, { messageId: message.id });
            return { status: 'ok', data: message };
        }
        catch (error) {
            throw new websockets_1.WsException({ event: socket_event_enum_1.SocketEvent.ERROR, message: error.message });
        }
    }
    async handleTyping(client, data) {
        this.server.to(data.roomId).emit(data.isTyping ? socket_event_enum_1.SocketEvent.USER_TYPING : socket_event_enum_1.SocketEvent.USER_STOP_TYPING, {
            userId: client.data.user.id,
            name: client.data.user.name,
            roomId: data.roomId,
        });
    }
    async handleMessageRead(client, data) {
        try {
            const message = await this.chatService.markMessageAsRead(data.messageId, client.data.user.id);
            const senderSocket = this.getUserSocket(message.sender.id);
            if (senderSocket) {
                senderSocket.emit(socket_event_enum_1.SocketEvent.MESSAGE_READ, {
                    messageId: message.id,
                    readBy: client.data.user.id,
                    chatRoomId: message.chatRoom.id,
                });
            }
            return { status: 'ok' };
        }
        catch (error) {
            throw new websockets_1.WsException({ event: socket_event_enum_1.SocketEvent.ERROR, message: error.message });
        }
    }
    async handleMarkAllMessagesAsRead(client, data) {
        try {
            await this.chatService.markAllMessagesAsRead(data.chatRoomId, client.data.user.id);
            this.server.to(data.chatRoomId).emit('allMessagesRead', {
                chatRoomId: data.chatRoomId,
                readBy: client.data.user.id,
            });
            return { status: 'ok' };
        }
        catch (error) {
            throw new websockets_1.WsException({ event: socket_event_enum_1.SocketEvent.ERROR, message: error.message });
        }
    }
    async handleGetUnreadCount(client) {
        try {
            const unreadCounts = await this.chatService.getUnreadMessageCount(client.data.user.id);
            client.emit('unreadCount', unreadCounts);
            return { status: 'ok', data: unreadCounts };
        }
        catch (error) {
            throw new websockets_1.WsException({ event: socket_event_enum_1.SocketEvent.ERROR, message: error.message });
        }
    }
    getUserSocket(userId) {
        return this.connectedClients.get(userId);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UseGuards)(ws_jwt_guard_1.WsJwtGuard),
    (0, websockets_1.SubscribeMessage)(socket_event_enum_1.SocketEvent.JOIN_ROOM),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket,
        socket_event_dto_1.JoinRoomEventDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, common_1.UseGuards)(ws_jwt_guard_1.WsJwtGuard),
    (0, websockets_1.SubscribeMessage)(socket_event_enum_1.SocketEvent.LEAVE_ROOM),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket,
        socket_event_dto_1.JoinRoomEventDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleLeaveRoom", null);
__decorate([
    (0, common_1.UseGuards)(ws_jwt_guard_1.WsJwtGuard),
    (0, websockets_1.SubscribeMessage)(socket_event_enum_1.SocketEvent.SEND_MESSAGE),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket,
        create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, common_1.UseGuards)(ws_jwt_guard_1.WsJwtGuard),
    (0, websockets_1.SubscribeMessage)(socket_event_enum_1.SocketEvent.USER_TYPING),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket,
        socket_event_dto_1.TypingEventDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleTyping", null);
__decorate([
    (0, common_1.UseGuards)(ws_jwt_guard_1.WsJwtGuard),
    (0, websockets_1.SubscribeMessage)(socket_event_enum_1.SocketEvent.MESSAGE_READ),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessageRead", null);
__decorate([
    (0, common_1.UseGuards)(ws_jwt_guard_1.WsJwtGuard),
    (0, websockets_1.SubscribeMessage)('markAllMessagesAsRead'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMarkAllMessagesAsRead", null);
__decorate([
    (0, common_1.UseGuards)(ws_jwt_guard_1.WsJwtGuard),
    (0, websockets_1.SubscribeMessage)('getUnreadCount'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleGetUnreadCount", null);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            credentials: true,
        },
        namespace: 'chat',
    }),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        users_service_1.UsersService,
        jwt_1.JwtService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map