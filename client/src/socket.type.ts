export interface Planet {
  id: string;
  name: string;
  position: { x: number; y: number; z: number };
  radius: number;
  scale: number;
}
export interface ServerToClientEvents {
  planetPositions: (planets: Planet[]) => void;
}

export interface ClientToServerEvents {}
