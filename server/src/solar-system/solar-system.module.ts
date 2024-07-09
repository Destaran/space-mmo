import { Module } from '@nestjs/common';
import { SolarSystemController } from './solar-system.controller';
import { SolarSystemService } from './solar-system.service';
import { SocketService } from 'src/socket/socket.service';
import { TimeService } from 'src/time/time.service';

@Module({
  controllers: [SolarSystemController],
  providers: [SolarSystemService, SocketService, TimeService],
})
export class SolarSystemModule {}
