import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'notifications' })
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger = new Logger('NotificationsGateway');

  // Map<userId, socketId>
  private connectedUsers = new Map<string, string>();

  constructor(private jwtService: JwtService) {}

  async handleConnection(client: Socket) {
    try {
      const token =
        client.handshake.auth?.token ||
        client.handshake.headers?.authorization?.split(' ')[1];

      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify(token);
      const userId = payload.sub || payload.userId;

      // خزّن الـ userId مع الـ socketId
      this.connectedUsers.set(userId, client.id);
      client.data.userId = userId;

      // join room باسم الـ userId
      client.join(`user:${userId}`);

      this.logger.log(`User ${userId} connected — socket: ${client.id}`);
    } catch {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.data?.userId;
    if (userId) {
      this.connectedUsers.delete(userId);
      this.logger.log(`User ${userId} disconnected`);
    }
  }

  // بعت notification لـ user معين
  sendToUser(userId: string, notification: object) {
    this.server.to(`user:${userId}`).emit('notification', notification);
  }

  // بعت لكل المتصلين (broadcast)
  broadcastToAll(notification: object) {
    this.server.emit('notification', notification);
  }
}