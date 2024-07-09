import styled from "styled-components";
import { DevConsole } from "./DevConsole";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
`;

export function Hud() {
  return (
    <Container>
      <DevConsole />
    </Container>
  );
}
