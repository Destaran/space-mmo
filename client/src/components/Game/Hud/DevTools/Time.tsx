interface Props {
  time: number;
}

function getUniformTime(time: number): string {
  return time.toString().length === 1 ? `0${time}` : `${time}`;
}

export function Time({ time }: Props) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = getUniformTime(date.getMonth() + 1);
  const day = getUniformTime(date.getDate());
  const hours = getUniformTime(date.getHours());
  const minutes = getUniformTime(date.getMinutes());
  const seconds = getUniformTime(date.getSeconds());
  const fullDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return <p>{fullDate}</p>;
}
