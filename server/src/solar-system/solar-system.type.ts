export interface Planet {
  id: string;
  name: string;
  position: { x: number; y: number; z: number };
  radius: number;
  scale: number;
  velocity: number;
}

export interface Sun {
  id: string;
  name: string;
  position: { x: number; y: number; z: number };
  scale: number;
}

export interface Statics {
  sun: Sun;
}

export interface Orbitals {
  planets: Planet[];
}
