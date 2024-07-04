import { Vector3 } from "three";
import { OrbitalEntities } from "./OrbitalEntities";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Ring,
} from "@react-three/drei";
import { StaticEntities } from "./StaticEntities";

export function SolarSystem() {
  const center = new Vector3(0, 0, 0);
  const defCamPos = new Vector3(0, 500, 540);
  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={defCamPos}
        far={1000000}
        near={0.1}
      />
      <OrbitControls target={center} maxDistance={10000} />
      <ambientLight intensity={0.1} />
      <pointLight position={center} intensity={500000} castShadow />
      <Environment files="./hdr.hdr" background blur={0.02} />
      <Ring />
      <group>
        <StaticEntities />
        <OrbitalEntities />
      </group>
    </>
  );
}
