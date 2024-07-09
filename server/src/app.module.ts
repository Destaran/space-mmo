import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketModule } from './socket/socket.module';
import { SolarSystemModule } from './solar-system/solar-system.module';
import { TimeModule } from './time/time.module';

@Module({
  imports: [SocketModule, SolarSystemModule, TimeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
