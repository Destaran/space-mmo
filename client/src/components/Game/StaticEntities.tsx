import { useEffect, useState } from "react";
import { Sun } from "./Entities/Sun";
import { socket } from "../../socket";
import { Statics } from "../../socket.type";

export function StaticEntities() {
  const [statics, setStatics] = useState<null | Statics>(null);

  function fetchStatics(statics: Statics) {
    setStatics(statics);
  }

  useEffect(() => {
    socket.on("staticPositions", fetchStatics);

    return () => {
      socket.off("staticPositions", fetchStatics);
    };
  }, []);

  if (statics === null) {
    return null;
  }

  return (
    <>
      <Sun sun={statics.sun} />;
    </>
  );
}
