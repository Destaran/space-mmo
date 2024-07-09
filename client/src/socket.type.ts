export interface Orbitals {
  planets: Planet[];
}

export interface Planet {
  id: string;
  name: string;
  position: { x: number; y: number; z: number };
  radius: number;
  scale: number;
}

export interface Orbitals {
  planets: Planet[];
}

export interface Statics {
  sun: Sun;
}

export interface Sun {
  id: string;
  name: string;
  position: { x: number; y: number; z: number };
  scale: number;
}
export interface ServerToClientEvents {
  orbitalPositions: (orbitals: Orbitals) => void;
  staticPositions: (staticEntities: Statics) => void;
  time: (time: number) => void;
}

export interface ClientToServerEvents {}
