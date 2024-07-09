import { Injectable } from '@nestjs/common';
import { Orbitals, Planet, Statics, Sun } from './solar-system.type';
import { planetData, sunData } from './solar-system.data';
import { TimeService } from 'src/time/time.service';

@Injectable()
export class SolarSystemService {
  private planets: Planet[] = planetData;
  private sun: Sun = sunData;

  constructor(private readonly timeService: TimeService) {}

  getStatics(): Statics {
    return {
      sun: this.sun,
    };
  }

  getOrbitals(): Orbitals {
    return {
      planets: this.planets,
    };
  }

  getOrbitalPosition(radius: number, timestamp = Date.now(), velocity: number) {
    const angularVelocity = velocity / 1000;
    const theta = angularVelocity * timestamp;

    const x = radius * Math.cos(theta);
    const y = 0;
    const z = radius * Math.sin(theta);

    return {
      x: Number(x.toFixed(3)),
      y: y,
      z: Number(z.toFixed(2)),
    };
  }

  updateOrbitals() {
    const time = this.timeService.getTime();
    this.planets.forEach((planet) => {
      planet.position = this.getOrbitalPosition(
        planet.radius,
        time,
        planet.velocity,
      );
    });
  }
}
