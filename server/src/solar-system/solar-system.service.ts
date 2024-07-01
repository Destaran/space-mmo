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

  updatePlanetPositions(deltaTime: number) {
    this.planets.forEach((planet) => {
      planet.position.x = Number(
        (planet.position.x + 1 * deltaTime).toFixed(2),
      );
      planet.position.y = Number(
        (planet.position.y + 1 * deltaTime).toFixed(2),
      );
    });
  }
}
