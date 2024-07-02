import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketService {
  private readonly connectedClients: Map<string, Socket> = new Map();

  handleConnection(socket: Socket): void {
    const clientId = socket.id;
    this.connectedClients.set(clientId, socket);
    console.log('Client connected:', clientId);

    socket.on('disconnect', () => {
      console.log('Client disconnected:', clientId);
      this.connectedClients.delete(clientId);
    });

    // Handle other events and messages from the client
  }

  // Add more methods for handling events, messages, etc.
}
