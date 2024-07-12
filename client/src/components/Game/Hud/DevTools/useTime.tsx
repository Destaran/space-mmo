function getUniformTime(time: number): string {
  return time.toString().length === 1 ? `0${time}` : `${time}`;
}

export function useTime(timestamp: number | null) {
  if (timestamp === null) {
    return;
  }
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = getUniformTime(date.getMonth() + 1);
  const day = getUniformTime(date.getDate());
  const hours = getUniformTime(date.getHours());
  const minutes = getUniformTime(date.getMinutes());
  const seconds = getUniformTime(date.getSeconds());
  const fullDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return fullDate;
}
