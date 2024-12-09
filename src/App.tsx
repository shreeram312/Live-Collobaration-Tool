import { Excalidraw } from "@excalidraw/excalidraw";
import { useOthers, useUpdateMyPresence } from "@liveblocks/react";

import "./theme.scss";

export default function ExcalidrawComponent() {
  const others = useOthers();
  const updateMyPresence = useUpdateMyPresence();
  console.log(others.length);
  console.log(updateMyPresence);

  return (
    <div>
      <div
        onPointerMove={(e) => {
          updateMyPresence({
            cursor: {
              x: e.clientX,
              y: e.clientY,
            },
          });
        }}
        onPointerLeave={(e) => {
          updateMyPresence({
            cursor: null,
          });
        }}
        style={{ height: "500px" }}
      >
        {others.map(({ connectionId, presence }: any) =>
          presence.cursor ? (
            <Cursor
              key={connectionId}
              x={presence.cursor.x}
              y={presence.cursor.y}
            />
          ) : null
        )}
        <Excalidraw />
      </div>

      <h1>jdhk</h1>
    </div>
  );
}

function Cursor({ x, y }: any) {
  return (
    <img
      style={{
        position: "absolute",
        transform: `translate(${x}px, ${y}px)`,
      }}
      src="/assets/react.svg"
    />
  );
}
