import { Module } from '@nestjs/common';
import { CommunicationService } from './communication.service';
import { SocketGateway } from './communication.gateway';
import { SolarSystemService } from 'src/solar-system/solar-system.service';
import { SchedulerService } from 'src/time/scheduler.service';

@Module({
  providers: [
    SocketGateway,
    CommunicationService,
    SolarSystemService,
    SchedulerService,
  ],
})
export class CommunicationModule {}
