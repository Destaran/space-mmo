import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from './socket.service';
import { SolarSystemService } from 'src/solar-system/solar-system.service';

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Socket;

  constructor(
    private readonly socketService: SocketService,
    private readonly solarSystemService: SolarSystemService,
  ) {}

  handleConnection(socket: Socket): void {
    this.socketService.handleConnection(socket);
  }

  update() {
    this.solarSystemService.updatePlanets();
    this.broadcastPlanets();
  }

  onModuleInit() {
    const UPDATE_INTERVAL = 1000 / 60; // 60 updates per second

    setInterval(() => {
      this.update();
    }, UPDATE_INTERVAL);
  }

  broadcastPlanets() {
    const planets = this.solarSystemService.getPlanets();
    this.server.emit('planetPositions', planets);
  }

  // Implement other Socket.IO event handlers and message handlers
}
