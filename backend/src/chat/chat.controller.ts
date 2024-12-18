import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('rooms')
  async createChatRoom(@Body() createChatRoomDto: CreateChatRoomDto, @Request() req) {
    return this.chatService.createChatRoom(createChatRoomDto, req.user.id);
  }

  @Get('rooms')
  async getChatRooms(@Request() req) {
    return this.chatService.getChatRooms(req.user.id);
  }

  @Get('rooms/:id')
  async getChatRoomById(@Param('id') id: string, @Request() req) {
    return this.chatService.getChatRoomById(id, req.user.id);
  }

  @Post('messages')
  async createMessage(@Body() createMessageDto: CreateMessageDto, @Request() req) {
    return this.chatService.createMessage(createMessageDto, req.user.id);
  }

  @Get('rooms/:id/messages')
  async getMessages(@Param('id') id: string, @Request() req) {
    return this.chatService.getMessages(id, req.user.id);
  }

  @Post('rooms/:id/read')
  async markMessagesAsRead(@Param('id') id: string, @Request() req) {
    await this.chatService.markMessagesAsRead(id, req.user.id);
    return { message: '消息已标记为已读' };
  }
} 