import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { createRoot } from "react-dom/client";
import ExcalidrawComponent from "./App";
import { LiveList } from "@liveblocks/client";

createRoot(document.getElementById("root")!).render(
  <LiveblocksProvider publicApiKey="">
    <RoomProvider
      id="my-room"
      initialPresence={{ cursor: null }}
      //@ts-ignore
      initialStorage={{
        drawings: new LiveList([
          {
            type: "rectangle", // type of the shape
            id: "1", // unique ID
            version: 1, // version number (increment on each update)
            versionNonce: 0, // version nonce
            isDeleted: false, // whether it's deleted or not
            x: 100, // x position of the top-left corner
            y: 100, // y position of the top-left corner
            width: 200, // width of the rectangle
            height: 100, // height of the rectangle
            angle: 0, // angle of rotation
            strokeColor: "#000000", // stroke color
            backgroundColor: "#ffffff", // background color
            fillStyle: "solid", // fill style
            strokeWidth: 1, // stroke width
            roughness: 0, // roughness (set to 0 for smooth edges)
            opacity: 100, // opacity (0 to 100)
          },
          {
            type: "ellipse", // type of the shape
            id: "2", // unique ID
            version: 1,
            versionNonce: 0,
            isDeleted: false,
            x: 400, // x position of the center
            y: 200, // y position of the center
            width: 150, // width of the ellipse
            height: 100, // height of the ellipse
            angle: 0,
            strokeColor: "#ff0000", // stroke color
            backgroundColor: "#00ff00", // background color
            fillStyle: "solid",
            strokeWidth: 2,
            roughness: 0,
            opacity: 100,
          },
        ]),
      }}
    >
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        <ExcalidrawComponent />
      </ClientSideSuspense>
    </RoomProvider>
  </LiveblocksProvider>
);
