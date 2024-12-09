"use client";
import { createRoot } from "react-dom/client";

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import ExcalidrawComponent from "./App";

createRoot(document.getElementById("root")!).render(
  //@ts-ignore
  <LiveblocksProvider publicApiKey={""}>
    <RoomProvider id="my-room" initialPresence={{ cursor: null }}>
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        <ExcalidrawComponent />
      </ClientSideSuspense>
    </RoomProvider>
  </LiveblocksProvider>
);
