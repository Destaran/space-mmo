import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { SolarSystemService } from 'src/solar-system/solar-system.service';
import { TimeService } from 'src/time/time.service';

@Module({
  providers: [SocketGateway, SocketService, SolarSystemService, TimeService],
})
export class SocketModule {}
