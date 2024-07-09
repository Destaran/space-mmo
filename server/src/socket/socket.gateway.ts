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
    this.solarSystemService.updateOrbitals();
    this.broadcastOrbitals();
    this.broadcastStatic();
  }

  onModuleInit() {
    const UPDATE_PER_SEC = 1;
    const UPDATE_INTERVAL = 1000 / UPDATE_PER_SEC;

    setInterval(() => {
      this.update();
    }, UPDATE_INTERVAL);
  }

  broadcastOrbitals() {
    const orbitals = this.solarSystemService.getOrbitals();
    this.server.emit('orbitalPositions', orbitals);
  }

  broadcastStatic() {
    const statics = this.solarSystemService.getStatics();
    this.server.emit('staticPositions', statics);
  }
}
