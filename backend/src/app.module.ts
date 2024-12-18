import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { User } from './users/user.entity';
import { Message } from './chat/entities/message.entity';
import { ChatRoom } from './chat/entities/chat-room.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_DATABASE || 'chat_app',
      entities: [User, Message, ChatRoom],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ChatModule,
  ],
})
export class AppModule {}
