import styled from "styled-components";

const ButtonElement = styled.button`
  background-color: rgba(0, 25, 50, 0.75);
  color: white;
  border: 1px solid rgba(119, 119, 119, 0.8);
  padding: 0.25rem;
  margin: 0.25rem;

  &:hover {
    background-color: rgba(0, 77, 155, 0.9);
    cursor: pointer;
  }

  &:active {
    background-color: rgba(0, 31, 61, 0.9);
    cursor: pointer;
  }
`;

interface Props {
  title: string;
  onClick: () => void;
}

export function Button({ title, onClick }: Props) {
  return <ButtonElement onClick={onClick}>{title}</ButtonElement>;
}
