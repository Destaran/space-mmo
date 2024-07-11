import { MenuItem, Select, Slider } from "@mui/material";
import { useState, ChangeEvent, useEffect } from "react";
import { socket } from "../../../../socket";
import { Section } from "../components/Section";
import { Button } from "../components/Button";
import { Time } from "./Time";
import { Window } from "../components/Window";

function freezeTime(time: number) {
  socket.emit("freezeTime", time);
}

function unfreezeTime() {
  socket.emit("unfreezeTime");
}

const dayLength = 86400000;

export function DevTools() {
  const [time, setTime] = useState<null | number>(null);
  const [frozen, setFrozen] = useState<boolean>(false);
  const [timeInterval, setTimeInterval] = useState<number>(dayLength);

  function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
    setTimeInterval(Number(e.target.value));
  }

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
    <Window title="Developer Tools">
      <Section title="Time Control">
        <Time time={time} />
        {frozen && timeInterval && (
          <>
            <Select
              labelId="time-interval-select"
              id="time-interval-select"
              value={timeInterval}
              label="Age"
              onChange={() => handleSelect}
            >
              <MenuItem value={dayLength}>1 Day</MenuItem>
              <MenuItem value={dayLength * 3}>3 Day</MenuItem>
              <MenuItem value={dayLength * 7}>1 Week</MenuItem>
              <MenuItem value={dayLength * 30}>1 Month</MenuItem>
              <MenuItem value={dayLength * 30 * 3}>3 Month</MenuItem>
              <MenuItem value={dayLength * 30 * 6}>6 Month</MenuItem>
            </Select>
            <Slider
              value={time}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleSlider(e)}
              max={Date.now()}
              min={Date.now() - timeInterval}
            />
          </>
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
