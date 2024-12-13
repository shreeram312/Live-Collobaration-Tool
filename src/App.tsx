import {
  convertToExcalidrawElements,
  Excalidraw,
} from "@excalidraw/excalidraw";
import { useOthers, useUpdateMyPresence } from "@liveblocks/react";
import { useState, useCallback, useEffect } from "react";

export default function ExcalidrawComponent() {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [elements, setElements] = useState(
    convertToExcalidrawElements([
      {
        type: "rectangle",
        x: 100,
        y: 250,
        width: 100,
        height: 100,
        backgroundColor: "#f0f0f0",
        strokeColor: "#000000",
      },
      {
        type: "ellipse",
        x: 250,
        y: 250,
        width: 100,
        height: 100,
        backgroundColor: "#f0f0f0",
        strokeColor: "#000000",
      },
      {
        type: "diamond",
        x: 380,
        y: 250,
        width: 100,
        height: 100,
        backgroundColor: "#f0f0f0",
        strokeColor: "#000000",
      },
    ])
  );

  // Liveblocks hooks
  const others = useOthers();
  const updateMyPresence = useUpdateMyPresence();

  const [shapeType, setShapeType] = useState("rectangle"); // Track shape type

  // Add shape creation and update presence
  const handleShapeCreation = useCallback(
    (e) => {
      // Use dynamic shape type from state
      const newShape = {
        type: shapeType, // Rectangle, ellipse, or other types
        x: e.clientX - 50, // Adjust for better positioning
        y: e.clientY - 50,
        width: 100,
        height: 100,
        backgroundColor: "#f0f0f0",
        strokeColor: "#000000",
        id: `shape-${Date.now()}`, // Unique ID
      };

      // Log the new shape for debugging
      console.log("Creating new shape:", newShape);

      // Update presence with the new shape
      updateMyPresence({
        shapes: [{ ...newShape }], // Send the new shape to others
        cursor: { x: e.clientX, y: e.clientY },
      });

      // Update local element state
      setElements((prevElements) => [...prevElements, newShape]);
    },
    [setElements, updateMyPresence, shapeType]
  );

  // Synchronize shapes from others
  useEffect(() => {
    const allShapes = others
      .map(({ presence }) => presence?.shapes || [])
      .flat();

    // Log to see the shapes received from others
    console.log("Other user's shapes:", allShapes);

    // Ensure we don't add duplicate shapes
    const newShapes = allShapes.filter(
      (shape) => !elements.some((el) => el.id === shape.id)
    );

    // Only update the state if there are new shapes
    if (newShapes.length > 0) {
      console.log("Adding new shapes from others:", newShapes);
      setElements((prevElements) => [...prevElements, ...newShapes]);
    }
  }, [others, elements]);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {/* Shape type selector (for testing) */}
      <div>
        <button onClick={() => setShapeType("rectangle")}>Rectangle</button>
        <button onClick={() => setShapeType("ellipse")}>Ellipse</button>
        <button onClick={() => setShapeType("diamond")}>Diamond</button>
      </div>

      {/* Track cursor movements */}
      <div
        onPointerMove={(e) => {
          updateMyPresence({
            cursor: { x: e.clientX, y: e.clientY },
          });
          handleShapeCreation(e); // Optionally add a new shape
        }}
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

        {/* Render shapes from other users */}
        {others.map(({ connectionId, presence }) =>
          presence?.shapes?.map((shape) => (
            <Shape key={shape.id} shape={shape} />
          ))
        )}

        {/* Excalidraw Canvas */}
        <div style={{ height: "100%", width: "100%" }}>
          <Excalidraw
            excalidrawAPI={(api) => setExcalidrawAPI(api)}
            initialData={{
              elements,
              appState: {
                zenModeEnabled: true,
                viewBackgroundColor: "#a5d8ff",
              },
              scrollToContent: true,
            }}
          />
        </div>
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

// Shape Component for rendering shapes
function Shape({ shape }) {
  const { type, x, y, width, height, backgroundColor, strokeColor } = shape;

  switch (type) {
    case "rectangle":
      return (
        <div
          style={{
            position: "absolute",
            left: `${x}px`,
            top: `${y}px`,
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: backgroundColor,
            border: `2px solid ${strokeColor}`,
          }}
        ></div>
      );
    case "ellipse":
      return (
        <div
          style={{
            position: "absolute",
            left: `${x}px`,
            top: `${y}px`,
            width: `${width}px`,
            height: `${height}px`,
            borderRadius: "50%",
            backgroundColor: backgroundColor,
            border: `2px solid ${strokeColor}`,
          }}
        ></div>
      );
    case "diamond":
      return (
        <div
          style={{
            position: "absolute",
            left: `${x}px`,
            top: `${y}px`,
            width: `${width}px`,
            height: `${height}px`,
            transform: "rotate(45deg)",
            backgroundColor: backgroundColor,
            border: `2px solid ${strokeColor}`,
          }}
        ></div>
      );
    // Add other shape types as needed
    default:
      return null;
  }
}
