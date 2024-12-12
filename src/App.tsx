import { Excalidraw } from "@excalidraw/excalidraw";
import { useOthers, useUpdateMyPresence } from "@liveblocks/react";
import { useState } from "react";

import "./theme.scss";

export default function ExcalidrawComponent() {
  const others = useOthers();
  const updateMyPresence = useUpdateMyPresence();
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <div
        onPointerMove={(e) => {
          updateMyPresence({
            cursor: {
              x: e.clientX,
              y: e.clientY,
            },
          });
        }}
        onPointerLeave={() => {
          updateMyPresence({
            cursor: null,
          });
        }}
        style={{ height: "100%", position: "relative" }}
      >
        {others.map(({ connectionId, presence }: any) =>
          presence?.cursor ? (
            <Cursor
              key={connectionId}
              x={presence.cursor.x}
              y={presence.cursor.y}
            />
          ) : null
        )}

        <Excalidraw
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
          style={{
            height: "500px",
            width: "100%",
            position: "absolute",
            zIndex: 1,
          }}
        />
      </div>
    </div>
  );
}

function Cursor({ x, y }: { x: number; y: number }) {
  return (
    <img
      style={{
        position: "absolute",
        transform: `translate(${x}px, ${y}px)`,
        zIndex: 10, // Ensure cursors are above the canvas
        pointerEvents: "none", // Prevent cursor interference
        width: "20px",
        height: "20px",
      }}
      src="https://cdn.vectorstock.com/i/500p/38/03/curve-arrow-upward-pictogram-icon-vector-41283803.jpg"
      alt="Cursor"
    />
  );
}
