import { Injectable } from '@nestjs/common';

export interface Planet {
  id: string;
  name: string;
  position: { x: number; y: number; z: number };
  radius: number;
  scale: number;
  velocity: number;
}

@Injectable()
export class SolarSystemService {
  private planets: Planet[] = [
    {
      id: '1',
      name: 'Mercury',
      position: { x: 0, y: 0, z: 0 },
      radius: 210,
      scale: 0.1,
      velocity: 0.1,
    },
    {
      id: '2',
      name: 'UFO',
      position: { x: 0, y: 0, z: 0 },
      radius: 400,
      scale: 10,
      velocity: 0.2,
    },
  ];

  getPlanets(): Planet[] {
    return this.planets;
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

  updatePlanets() {
    this.planets.forEach((planet) => {
      planet.position = this.getOrbitalPosition(
        planet.radius,
        Date.now(),
        planet.velocity,
      );
    });
  }
}
