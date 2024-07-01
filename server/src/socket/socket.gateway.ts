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

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Client connected:', socket.id);
    });
    const UPDATE_INTERVAL = 1000 / 1; // 60 updates per second

    setInterval(() => {
      this.solarSystemService.updatePlanetPositions(UPDATE_INTERVAL / 1000); // convert ms to seconds
      this.broadcastPlanetPositions();
    }, UPDATE_INTERVAL);
  }

  broadcastPlanetPositions() {
    const planets = this.solarSystemService.getPlanets();
    this.server.emit('planetPositions', planets);
  }

  // Implement other Socket.IO event handlers and message handlers
}
