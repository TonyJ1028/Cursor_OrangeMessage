export declare class TypingEventDto {
    roomId: string;
    isTyping: boolean;
}
export declare class JoinRoomEventDto {
    roomId: string;
}
export declare class MessageEventDto {
    id: string;
    content: string;
    senderId: string;
    senderName: string;
    chatRoomId: string;
    createdAt: Date;
    isRead: boolean;
}
export declare class UserStatusEventDto {
    userId: string;
    isOnline: boolean;
    lastSeen?: Date;
}
export declare class MessageReadEventDto {
    messageId: string;
    readBy: string;
    chatRoomId: string;
}
export declare class AllMessagesReadEventDto {
    chatRoomId: string;
    readBy: string;
}
export declare class UnreadCountEventDto {
    [chatRoomId: string]: number;
}
