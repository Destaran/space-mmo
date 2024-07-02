import { Injectable } from '@nestjs/common';

export interface Planet {
  id: string;
  name: string;
  position: { x: number; y: number; z: number };
}

@Injectable()
export class SolarSystemService {
  private planets: Planet[] = [
    {
      id: '1',
      name: 'Chirico',
      position: { x: 0, y: 0, z: 0 },
    },
  ];

  getPlanets(): Planet[] {
    return this.planets;
  }

  getOrbitalPosition(radius: number, timestamp = Date.now(), velocity: number) {
    // Angular velocity (radians per millisecond)
    // Assuming velocity is given in radians per second
    const angularVelocity = velocity / 1000;

    // Calculate the total angle rotated since timestamp 0
    const theta = angularVelocity * timestamp;

    // Calculate x and y coordinates
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);

    return { x: Number(x.toFixed(3)), y: Number(y.toFixed(2)), z: 0 };
  }

  updatePlanetPositions() {
    this.planets.forEach((planet) => {
      planet.position = this.getOrbitalPosition(1, Date.now(), 2 * Math.PI);
    });
  }
}
