import { useTime } from "./useTime";

interface Props {
  timestamp: number;
}

export function Time({ timestamp }: Props) {
  const fullDate = useTime(timestamp);
  return <p>{fullDate}</p>;
}
