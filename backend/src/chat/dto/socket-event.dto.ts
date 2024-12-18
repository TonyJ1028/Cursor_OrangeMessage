export class TypingEventDto {
  roomId: string;
  isTyping: boolean;
}

export class JoinRoomEventDto {
  roomId: string;
}

export class MessageEventDto {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  chatRoomId: string;
  createdAt: Date;
  isRead: boolean;
}

export class UserStatusEventDto {
  userId: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export class MessageReadEventDto {
  messageId: string;
  readBy: string;
  chatRoomId: string;
}

export class AllMessagesReadEventDto {
  chatRoomId: string;
  readBy: string;
}

export class UnreadCountEventDto {
  [chatRoomId: string]: number;
} 