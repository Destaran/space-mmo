import { useEffect, useState } from "react";
import { Orbitals } from "../../socket.type";
import { socket } from "../../socket";
import { PlanetMesh } from "./Entities/PlanetMesh";

export function OrbitalEntities() {
  const [orbitals, setOrbitals] = useState<Orbitals | null>(null);
  function fetchPlanets(orbitals: Orbitals) {
    setOrbitals(orbitals);
  }

  useEffect(() => {
    socket.on("orbitalPositions", fetchPlanets);

    return () => {
      socket.off("orbitalPositions", fetchPlanets);
    };
  }, []);

  if (orbitals === null) {
    return null;
  }

  const { planets } = orbitals;

  return (
    <>
      {planets.map((planet) => {
        return <PlanetMesh key={planet.name} planet={planet} />;
      })}
    </>
  );
}
