import { Module } from '@nestjs/common';
import { SolarSystemController } from './solar-system.controller';
import { SolarSystemService } from './solar-system.service';
import { SocketService } from 'src/socket/socket.service';

@Module({
  controllers: [SolarSystemController],
  providers: [SolarSystemService, SocketService],
})
export class SolarSystemModule {}
