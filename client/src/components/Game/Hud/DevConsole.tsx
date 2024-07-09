import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "./Button";
import { Window } from "./Window";
import { socket } from "../../../socket";
import { Section } from "./Section";
import { Time } from "./Time";
import { Slider } from "@mui/material";

function freezeTime(time: number) {
  socket.emit("freezeTime", time);
}

function unfreezeTime() {
  socket.emit("unfreezeTime");
}

export function DevConsole() {
  const [time, setTime] = useState<null | number>(null);
  const [frozen, setFrozen] = useState<boolean>(false);

  function handleFreezeTime() {
    if (!time) {
      return;
    }
    freezeTime(time);
    if (!frozen) {
      setFrozen(true);
    }
  }

  function handleUnfreezeTime() {
    if (frozen) {
      setFrozen(false);
    }
    unfreezeTime();
  }

  function handleSlider(event: ChangeEvent<HTMLInputElement>) {
    freezeTime(Number(event.target.value));
  }

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
        {frozen && (
          <Slider
            value={time}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleSlider(e)}
            max={Date.now()}
            min={Date.now() - 2419200000}
          />
        )}
        {frozen ? (
          <Button title="Unfreeze Time" onClick={() => handleUnfreezeTime()} />
        ) : (
          <Button title="Freeze Time" onClick={() => handleFreezeTime()} />
        )}
      </Section>
    </Window>
  );
}
