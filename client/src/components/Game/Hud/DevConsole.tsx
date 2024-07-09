import { useEffect, useState } from "react";
import { Button } from "./Button";
import { Window } from "./Window";
import { socket } from "../../../socket";
import { Section } from "./Section";
import { Time } from "./Time";

export function DevConsole() {
  const [time, setTime] = useState<null | number>(null);

  function fetchTime(time: number) {
    setTime(time);
  }

  useEffect(() => {
    socket.on("time", fetchTime);

    return () => {
      socket.off("time", fetchTime);
    };
  }, []);

  if (time === null) {
    return null;
  }

  return (
    <Window title="Dev Console">
      <Section title="Time Control">
        <p>{time}</p>
        <Time time={time} />
        <Button title="Freeze Time" onClick={() => null} />
        <Button title="Continue Time" onClick={() => null} />
      </Section>
    </Window>
  );
}
