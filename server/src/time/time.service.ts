import { Injectable } from '@nestjs/common';

@Injectable()
export class TimeService {
  private startTime: number = Date.now();
  private freezeTimestamp: number | null = null;

  getStartTime() {
    return this.startTime;
  }

  getUptime() {
    return Date.now() - this.startTime;
  }

  getTime() {
    if (this.freezeTimestamp) {
      return this.freezeTimestamp;
    }
    return Date.now();
  }

  freezeTime(timestamp: number) {
    this.freezeTimestamp = timestamp;
  }

  unfreezeTime() {
    this.freezeTimestamp = null;
  }
}
