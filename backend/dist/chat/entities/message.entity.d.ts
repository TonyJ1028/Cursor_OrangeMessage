import { User } from '../../users/user.entity';
import { ChatRoom } from './chat-room.entity';
export declare class Message {
    id: string;
    content: string;
    sender: User;
    chatRoom: ChatRoom;
    isRead: boolean;
    createdAt: Date;
}
