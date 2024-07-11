import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 0;
  background-color: rgba(0, 25, 50, 0.75);
  color: white;
  margin: 1rem;
  width: 400px;
  height: auto;
  border: 1px solid rgba(119, 119, 119, 0.8);
`;

const Header = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: start;
  width: 100%;
  padding: 0;
  background-color: rgba(0, 25, 50, 0.75);
  border-bottom: 1px solid rgba(119, 119, 119, 0.8);
  padding: 0.25rem 0.5rem;
`;

const Body = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 0.5rem;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  padding: 0;
  margin: 0;
  font-family: helvetica;
`;

interface Props {
  title: string;
  children: React.ReactNode;
}

export function Window({ title, children }: Props) {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
      </Header>
      <Body>{children}</Body>
    </Container>
  );
}
