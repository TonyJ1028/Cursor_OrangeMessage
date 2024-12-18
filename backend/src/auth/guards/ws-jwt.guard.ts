import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client: Socket = context.switchToWs().getClient();
      const token = client.handshake.auth.token?.split(' ')[1];
      
      if (!token) {
        throw new WsException('未授权');
      }

      const payload = this.jwtService.verify(token);
      return Boolean(payload);
    } catch (err) {
      throw new WsException('未授权');
    }
  }
} 