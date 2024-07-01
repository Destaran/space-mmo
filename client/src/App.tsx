import { useEffect } from "react";
import { ConnectionState } from "./components/ConnectionState";
import { ConnectionManager } from "./components/ConnectionManager";
import { socket } from "./socket.ts";

export interface Planet {
  id: string;
  name: string;
  position: { x: number; y: number; z: number };
}

export default function App() {
  function logPlanets(planets: Planet[]) {
    console.log(planets);
  }

  useEffect(() => {
    socket.on("planetPositions", logPlanets);

    return () => {
      socket.off("planetPositions", logPlanets);
    };
  }, []);

  return (
    <>
      <ConnectionState />
      <ConnectionManager />
    </>
  );
}
