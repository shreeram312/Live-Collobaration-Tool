import { Excalidraw } from "@excalidraw/excalidraw";
import {
  useOthers,
  useStorage,
  useMutation,
  useUpdateMyPresence,
} from "@liveblocks/react";
import { useState, useEffect } from "react";
import { LiveList } from "@liveblocks/client"; // Import LiveList

export default function ExcalidrawComponent() {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  // Liveblocks hooks
  const others = useOthers();
  const updateMyPresence = useUpdateMyPresence();

  // Shared drawings stored in Liveblocks
  const drawings = useStorage((root) => root.drawings);

  // Mutation to update drawings in Liveblocks
  const updateDrawings = useMutation(({ storage }, updatedDrawings) => {
    const drawingsList = storage.get("drawings");
    if (drawingsList instanceof LiveList) {
      drawingsList.clear(); // Clear the existing list
      //@ts-ignore
      drawingsList.push(...updatedDrawings); // Push new elements
    } else {
      console.error("drawingsList is not a LiveList");
    }
  }, []);

  // Sync Excalidraw elements with the Liveblocks storage
  useEffect(() => {
    if (excalidrawAPI && drawings) {
      // @ts-ignore
      excalidrawAPI.updateScene({
        //@ts-ignore
        elements: drawings ? drawings.toArray() : [],
      });
    }
  }, [excalidrawAPI, drawings]);

  // Handle changes in Excalidraw and sync with Liveblocks
  const onChange = (elements: any) => {
    if (drawings) {
      updateDrawings(elements);
    }
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {/* Track cursor movements */}
      <div
        onPointerMove={(e) =>
          updateMyPresence({
            cursor: { x: e.clientX, y: e.clientY },
          })
        }
        onPointerLeave={() => updateMyPresence({ cursor: null })}
        style={{ height: "100%", position: "relative" }}
      >
        {/* Render other users' cursors */}
        {others.map(({ connectionId, presence }) =>
          presence?.cursor ? (
            <Cursor
              key={connectionId}
              x={presence.cursor.x}
              y={presence.cursor.y}
            />
          ) : null
        )}

        {/* Excalidraw Canvas */}
        <Excalidraw
          onChange={onChange}
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
          initialData={{ appState: { viewBackgroundColor: "#edf2ff" } }}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    </div>
  );
}

// Cursor Component for displaying other users' cursors
function Cursor({ x, y }) {
  return (
    <img
      style={{
        position: "absolute",
        transform: `translate(${x}px, ${y}px)`,
        zIndex: 999, // Ensures cursors are on top of everything
        pointerEvents: "none", // Prevent interference with canvas interactions
        width: "20px",
        height: "20px",
      }}
      src="https://cdn.vectorstock.com/i/500p/38/03/curve-arrow-upward-pictogram-icon-vector-41283803.jpg"
      alt="Cursor"
    />
  );
}
