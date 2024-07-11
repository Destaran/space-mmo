import styled from "styled-components";

const Container = styled.div`
  width: 80%;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: start;
  border-bottom: 1px solid rgba(119, 119, 119, 0.8);
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1rem;
  padding: 0;
  margin: 0;
  font-family: helvetica;
`;

interface Props {
  title: string;
  children: React.ReactNode;
}

export function Section({ title, children }: Props) {
  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      {children}
    </Container>
  );
}
