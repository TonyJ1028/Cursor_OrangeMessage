import { User } from '../../users/user.entity';
import { Message } from './message.entity';
export declare class ChatRoom {
    id: string;
    name: string;
    description: string;
    isGroup: boolean;
    participants: User[];
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
}
