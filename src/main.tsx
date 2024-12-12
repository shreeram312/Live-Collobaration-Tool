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
      initialStorage={{ drawings: new LiveList([]) }} // Initialize drawings
    >
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        <ExcalidrawComponent />
      </ClientSideSuspense>
    </RoomProvider>
  </LiveblocksProvider>
);
