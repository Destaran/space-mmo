import { Planet } from "./App";

export interface ServerToClientEvents {
  planetPositions: (planets: Planet[]) => void;
}

export interface ClientToServerEvents {}
