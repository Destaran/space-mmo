import { Canvas } from "@react-three/fiber";
import { Vector3 } from "three";
import { Suspense } from "react";
import styled from "styled-components";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Ring,
} from "@react-three/drei";
import { Loader } from "./Loader";
import { Sun } from "./Sun";
import { Planets } from "./Planets";

const Container = styled.div`
  display: flex;
  position: relative;
  height: 100vh;
  width: 100%;
  canvas {
    background-color: black;
  }
`;

export function Game() {
  const sunPos = new Vector3(0, 0, 0);
  const defCamPos = new Vector3(0, 500, 540);

  return (
    <Container>
      <Canvas>
        <Suspense fallback={<Loader />}>
          <PerspectiveCamera
            makeDefault
            position={defCamPos}
            far={1000000}
            near={0.001}
          />
          <OrbitControls target={sunPos} maxDistance={10000} />
          <ambientLight intensity={0.1} />
          <pointLight position={sunPos} intensity={500000} castShadow />
          <Environment files="./hdr.hdr" background blur={0.02} />
          <Ring />
          <group>
            <Sun position={sunPos} scale={116.955} />
            <Planets />
          </group>
        </Suspense>
      </Canvas>
    </Container>
  );
}
