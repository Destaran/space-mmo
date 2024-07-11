import styled from "styled-components";
import { DevTools } from "./DevTools/DevTools";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
`;

export function Hud() {
  return (
    <Container>
      <DevTools />
    </Container>
  );
}
