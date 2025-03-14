import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommunicationModule } from './communication/communication.module';
import { SolarSystemModule } from './solar-system/solar-system.module';
import { SchedulerModule } from './time/scheduler.module';

@Module({
  imports: [CommunicationModule, SolarSystemModule, SchedulerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
