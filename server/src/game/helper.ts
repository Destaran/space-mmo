import { Fleet, Position } from './fleet';

export function getDistance(a: Position, b: Position): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export function battle(attacker: Fleet, defender: Fleet) {
  const attackerDamage = attacker.ships.reduce(
    (acc, ship) => acc + ship.weaponry.damage,
    0,
  );
  const defenderDamage = defender.ships.reduce(
    (acc, ship) => acc + ship.weaponry.damage,
    0,
  );

  const loser = attackerDamage > defenderDamage ? defender : attacker;
  loser.attackable.destroyed = true;
}
