import { useEffect, useState } from "react";
import { socket } from "../socket";

export function ConnectionState() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  function onConnect() {
    setIsConnected(true);
  }

  function onDisconnect() {
    setIsConnected(false);
  }

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  return <p>Connected: {"" + isConnected}</p>;
}
