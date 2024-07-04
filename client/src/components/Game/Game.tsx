import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import styled from "styled-components";
import { Loader } from "./Loader";
import { SolarSystem } from "./SolarSystem";

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
  return (
    <Container>
      <Canvas>
        <Suspense fallback={<Loader />}>
          <SolarSystem />
        </Suspense>
      </Canvas>
    </Container>
  );
}
