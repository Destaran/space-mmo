interface ShipData {
  health: Health;
  cargo: Cargo;
  thrusters: Thrusters;
  weaponry?: Weaponry;
}

export class Ship {
  health: Health;
  cargo: Cargo;
  thrusters: Thrusters;
  weaponry?: Weaponry;

  constructor({ health, cargo, thrusters, weaponry }: ShipData) {
    if (weaponry) {
      this.weaponry = weaponry;
    }
    this.health = health;
    this.cargo = cargo;
    this.thrusters = thrusters;
  }
}

export class Weaponry {
  damage: number;

  constructor(damage: number) {
    this.damage = damage;
  }
}

export class Thrusters {
  velocity: number;

  constructor(velocity: number) {
    this.velocity = velocity;
  }
}

export class Health {
  structure: number;
  armor: number;
  shield: number;

  constructor(structure: number, armor: number, shield: number) {
    this.structure = structure;
    this.armor = armor;
    this.shield = shield;
  }
}

export class Cargo {
  capacity: number;
  inventory: object[];

  constructor(capacity: number) {
    this.capacity = capacity;
    this.inventory = [];
  }
}
