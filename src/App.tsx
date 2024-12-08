import { Excalidraw } from "@excalidraw/excalidraw";
import { useOthers } from "@liveblocks/react";

import "./theme.scss";

export default function ExcalidrawComponent() {
  const others = useOthers();
  console.log(others.length);

  return (
    <div style={{ height: "500px" }}>
      <Excalidraw />
    </div>
  );
}
