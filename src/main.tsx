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
  <LiveblocksProvider publicApiKey={"YOUR_PUBLIC_API_KEY"}>
    <RoomProvider id="my-room">
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        <ExcalidrawComponent />
      </ClientSideSuspense>
    </RoomProvider>
  </LiveblocksProvider>
);
