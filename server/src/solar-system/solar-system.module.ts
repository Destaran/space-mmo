import { Module } from '@nestjs/common';
import { SolarSystemController } from './solar-system.controller';
import { SolarSystemService } from './solar-system.service';
import { CommunicationService } from 'src/communication/communication.service';
import { SchedulerService } from 'src/time/scheduler.service';

@Module({
  controllers: [SolarSystemController],
  providers: [SolarSystemService, CommunicationService, SchedulerService],
})
export class SolarSystemModule {}
