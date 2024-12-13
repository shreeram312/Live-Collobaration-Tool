import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { createRoot } from "react-dom/client";
import ExcalidrawComponent from "./App";
import { LiveList } from "@liveblocks/client";

createRoot(document.getElementById("root")!).render(
  <LiveblocksProvider
    publicApiKey=""
    resolveUsers={async ({ userIds }) => {
      // ["marc@example.com", "nimesh@example.com"];
      console.log(userIds);

      return [
        { name: "Marc", avatar: "https://example.com/marc.png" },
        { name: "Nimesh", avatar: "https://example.com/nimesh.png" },
      ];
    }}
  >
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
