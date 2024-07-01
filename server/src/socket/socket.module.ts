import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { SolarSystemService } from 'src/solar-system/solar-system.service';

@Module({
  providers: [SocketGateway, SocketService, SolarSystemService],
})
export class SocketModule {}
