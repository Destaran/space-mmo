import {
  createTheme,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  ThemeProvider,
} from "@mui/material";
import { useState, ChangeEvent, useEffect } from "react";
import { socket } from "../../../../socket";
import { Section } from "../components/Section";
import { Button } from "../components/Button";
import { Time } from "./Time";
import { Window } from "../components/Window";
import { useTime } from "./useTime";

const theme = createTheme({
  palette: {
    background: {
      paper: "#006308",
    },
    text: {
      primary: "#fafafa",
      secondary: "#46505A",
    },
    action: {
      active: "#001E3C",
    },
  },
});

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

  const formattedTime = useTime(time);

  function handleSelect(e: SelectChangeEvent<number>) {
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

  function valuetext() {
    return `${formattedTime}°C`;
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

  const marks = [
    {
      value: Date.now() - timeInterval * 0.75,
      label: ".75",
    },
    {
      value: Date.now() - timeInterval * 0.5,
      label: ".50",
    },
    {
      value: Date.now() - timeInterval * 0.25,
      label: ".25",
    },
  ];

  return (
    <Window title="Developer Tools">
      <Section title="Time Control">
        <Time timestamp={time} />
        {frozen && timeInterval && (
          <>
            <ThemeProvider theme={theme}>
              <Select
                sx={{ color: "text.primary" }}
                labelId="time-interval-select"
                id="time-interval-select"
                value={timeInterval}
                label="Age"
                onChange={(e: SelectChangeEvent<number>) => handleSelect(e)}
                color="primary"
              >
                <MenuItem value={dayLength}>1 Day</MenuItem>
                <MenuItem value={dayLength * 3}>3 Day</MenuItem>
                <MenuItem value={dayLength * 7}>1 Week</MenuItem>
                <MenuItem value={dayLength * 30}>1 Month</MenuItem>
                <MenuItem value={dayLength * 30 * 3}>3 Month</MenuItem>
                <MenuItem value={dayLength * 30 * 6}>6 Month</MenuItem>
              </Select>
              <Slider
                sx={{ color: "text.primary" }}
                getAriaValueText={valuetext}
                key={timeInterval}
                value={time}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleSlider(e)}
                max={Date.now()}
                min={Date.now() - timeInterval}
                marks={marks}
                color="primary"
              />
            </ThemeProvider>
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
