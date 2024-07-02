import { ConnectionState } from "./components/ConnectionState";
import { ConnectionManager } from "./components/ConnectionManager";
import { Game } from "./components/Game/Game";

export default function App() {
  return (
    <>
      <ConnectionState />
      <ConnectionManager />
      <Game />
    </>
  );
}
