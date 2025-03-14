import { getDistance } from './helper';
import { Ship } from './ship';

export class Position {
  x: number | null;
  y: number | null;
  z: number | null;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export class Moveable {
  position: Position;
  velocity: number;

  constructor(position: Position, velocity: number) {
    this.position = position;
    this.velocity = velocity;
  }

  move(dx: number, dy: number, dz: number) {
    this.position.x += dx;
    this.position.y += dy;
    this.position.z += dz;
  }

  moveTowards(target: Position) {
    const dx = target.x - this.position.x;
    const dy = target.y - this.position.y;
    const dz = target.z - this.position.z;
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const ratio = this.velocity / distance;
    this.move(dx * ratio, dy * ratio, dz * ratio);
  }
}

export class Attackable {
  destroyed: boolean;
}

export class CanAttack {
  range: number;
  position: Position;
  moveable: Moveable;
  target: { position: Position; attackable: Attackable } | null;

  constructor(range: number, position: Position, moveable: Moveable) {
    this.range = range;
    this.position = position;
    this.moveable = moveable;
    this.target = null;
  }

  attack() {
    if (
      this.target &&
      getDistance(this.position, this.target.position) <= this.range
    ) {
      this.target.attackable.destroyed = true;
    }
  }
}

export class Targeting {
  target: object;
}

export class Fleet {
  ships: Ship[];
  position: Position;
  moveable: Moveable;
  attackable: Attackable;
  canAttack?: CanAttack;

  constructor(ships: Ship[], position: Position) {
    this.ships = ships;
    this.position = position;
    this.moveable = new Moveable(position, 0);
    this.attackable = new Attackable();
    for (const ship of ships) {
      if (ship.weaponry) {
        this.canAttack = new CanAttack(50, this.position, this.moveable);
        break;
      }
    }
  }
}
