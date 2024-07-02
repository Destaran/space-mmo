import { useEffect, useState } from "react";
import { Planet } from "../../socket.type";
import { socket } from "../../socket";
import { PlanetMesh } from "./PlanetMesh";

export function Planets() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  function fetchPlanets(planets: Planet[]) {
    setPlanets(planets);
    console.log(planets);
  }

  useEffect(() => {
    socket.on("planetPositions", fetchPlanets);

    return () => {
      socket.off("planetPositions", fetchPlanets);
    };
  }, []);

  return (
    <>
      {planets.map((planet) => {
        return <PlanetMesh key={planet.name} planet={planet} />;
      })}
    </>
  );
}
