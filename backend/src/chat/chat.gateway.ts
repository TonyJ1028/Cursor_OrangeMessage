import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from './chat.service';
import { UsersService } from '../users/users.service';
import { WsJwtGuard } from '../auth/guards/ws-jwt.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import {
  TypingEventDto,
  JoinRoomEventDto,
  MessageEventDto,
  UserStatusEventDto,
} from './dto/socket-event.dto';
import { SocketEvent } from './enums/socket-event.enum';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
  namespace: 'chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedClients: Map<string, Socket> = new Map();

  constructor(
    private chatService: ChatService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token?.split(' ')[1];
      if (!token) {
        client.emit(SocketEvent.UNAUTHORIZED, { message: '未授权' });
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findById(payload.sub);
      
      client.data.user = user;
      this.connectedClients.set(user.id, client);
      await this.usersService.updateOnlineStatus(user.id, true);
      
      // 加入用户所在的所有聊天室
      const chatRooms = await this.chatService.getChatRooms(user.id);
      for (const room of chatRooms) {
        client.join(room.id);
        client.emit(SocketEvent.ROOM_JOINED, { roomId: room.id });
      }
      
      // 广播用户上线状态
      const statusEvent: UserStatusEventDto = {
        userId: user.id,
        isOnline: true,
      };
      this.server.emit(SocketEvent.USER_ONLINE, statusEvent);
    } catch (error) {
      client.emit(SocketEvent.ERROR, { message: error.message });
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    if (client.data.user) {
      const user = client.data.user;
      this.connectedClients.delete(user.id);
      await this.usersService.updateOnlineStatus(user.id, false);
      
      // 广播用户下线状态
      const statusEvent: UserStatusEventDto = {
        userId: user.id,
        isOnline: false,
        lastSeen: new Date(),
      };
      this.server.emit(SocketEvent.USER_OFFLINE, statusEvent);
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage(SocketEvent.JOIN_ROOM)
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: JoinRoomEventDto,
  ) {
    try {
      const chatRoom = await this.chatService.getChatRoomById(data.roomId, client.data.user.id);
      client.join(data.roomId);
      client.emit(SocketEvent.ROOM_JOINED, { roomId: data.roomId });
      return { status: 'ok' };
    } catch (error) {
      if (error.message === '聊天室不存在') {
        throw new WsException({ event: SocketEvent.NOT_FOUND, message: error.message });
      }
      if (error.message === '您不是该聊天室的成员') {
        throw new WsException({ event: SocketEvent.FORBIDDEN, message: error.message });
      }
      throw new WsException({ event: SocketEvent.ERROR, message: error.message });
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage(SocketEvent.LEAVE_ROOM)
  async handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: JoinRoomEventDto,
  ) {
    client.leave(data.roomId);
    client.emit(SocketEvent.ROOM_LEFT, { roomId: data.roomId });
    return { status: 'ok' };
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage(SocketEvent.SEND_MESSAGE)
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() createMessageDto: CreateMessageDto,
  ) {
    try {
      const message = await this.chatService.createMessage(
        createMessageDto,
        client.data.user.id,
      );

      const messageEvent: MessageEventDto = {
        id: message.id,
        content: message.content,
        senderId: client.data.user.id,
        senderName: client.data.user.name,
        chatRoomId: createMessageDto.chatRoomId,
        createdAt: message.createdAt,
        isRead: message.isRead,
      };

      // 广播消息到聊天室
      this.server.to(createMessageDto.chatRoomId).emit(SocketEvent.NEW_MESSAGE, messageEvent);

      // 确认消息已送达
      client.emit(SocketEvent.MESSAGE_RECEIVED, { messageId: message.id });

      return { status: 'ok', data: message };
    } catch (error) {
      throw new WsException({ event: SocketEvent.ERROR, message: error.message });
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage(SocketEvent.USER_TYPING)
  async handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: TypingEventDto,
  ) {
    // 广播用户输入状态
    this.server.to(data.roomId).emit(data.isTyping ? SocketEvent.USER_TYPING : SocketEvent.USER_STOP_TYPING, {
      userId: client.data.user.id,
      name: client.data.user.name,
      roomId: data.roomId,
    });
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage(SocketEvent.MESSAGE_READ)
  async handleMessageRead(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { messageId: string },
  ) {
    try {
      const message = await this.chatService.markMessageAsRead(
        data.messageId,
        client.data.user.id,
      );

      // 通知发送者消息已读
      const senderSocket = this.getUserSocket(message.sender.id);
      if (senderSocket) {
        senderSocket.emit(SocketEvent.MESSAGE_READ, {
          messageId: message.id,
          readBy: client.data.user.id,
          chatRoomId: message.chatRoom.id,
        });
      }

      return { status: 'ok' };
    } catch (error) {
      throw new WsException({ event: SocketEvent.ERROR, message: error.message });
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('markAllMessagesAsRead')
  async handleMarkAllMessagesAsRead(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { chatRoomId: string },
  ) {
    try {
      await this.chatService.markAllMessagesAsRead(
        data.chatRoomId,
        client.data.user.id,
      );

      // 通知聊天室所有成员
      this.server.to(data.chatRoomId).emit('allMessagesRead', {
        chatRoomId: data.chatRoomId,
        readBy: client.data.user.id,
      });

      return { status: 'ok' };
    } catch (error) {
      throw new WsException({ event: SocketEvent.ERROR, message: error.message });
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('getUnreadCount')
  async handleGetUnreadCount(@ConnectedSocket() client: Socket) {
    try {
      const unreadCounts = await this.chatService.getUnreadMessageCount(
        client.data.user.id,
      );

      client.emit('unreadCount', unreadCounts);
      return { status: 'ok', data: unreadCounts };
    } catch (error) {
      throw new WsException({ event: SocketEvent.ERROR, message: error.message });
    }
  }

  private getUserSocket(userId: string): Socket | undefined {
    return this.connectedClients.get(userId);
  }
} 