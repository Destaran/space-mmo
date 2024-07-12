import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from './socket.service';
import { SolarSystemService } from 'src/solar-system/solar-system.service';
import { TimeService } from 'src/time/time.service';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class SocketGateway
  implements OnGatewayConnection, OnModuleInit, OnModuleDestroy
{
  @WebSocketServer()
  private server: Socket;
  private interval: NodeJS.Timeout | null;

  constructor(
    private readonly socketService: SocketService,
    private readonly solarSystemService: SolarSystemService,
    private readonly timeService: TimeService,
  ) {}

  handleConnection(socket: Socket): void {
    this.socketService.handleConnection(socket);
  }

  @SubscribeMessage('freezeTime')
  handleFreezeTime(@MessageBody() timestamp: number) {
    this.timeService.freezeTime(timestamp);
  }

  @SubscribeMessage('unfreezeTime')
  handleUnfreezeTime() {
    this.timeService.unfreezeTime();
  }

  update() {
    this.solarSystemService.updateOrbitals();
    this.broadcastOrbitals();
    this.broadcastStatic();
    this.broadcastTime();
  }

  onModuleInit() {
    const UPDATE_PER_SEC = 2;
    const UPDATE_INTERVAL = 1000 / UPDATE_PER_SEC;

    this.interval = setInterval(() => {
      this.update();
    }, UPDATE_INTERVAL);
  }

  onModuleDestroy() {
    clearInterval(this.interval);
    this.interval = null;
  }

  broadcastOrbitals() {
    const orbitals = this.solarSystemService.getOrbitals();
    this.server.emit('orbitalPositions', orbitals);
  }

  broadcastStatic() {
    const statics = this.solarSystemService.getStatics();
    this.server.emit('staticPositions', statics);
  }

  broadcastTime() {
    const time = this.timeService.getTime();
    this.server.emit('time', time);
  }
}
