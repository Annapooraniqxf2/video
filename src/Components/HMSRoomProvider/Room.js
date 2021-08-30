import React from "react"
import VideoTiles from "./VideoTiles";
import ScreenShare from "./Screenshare"
import {
  useHMSStore,
  selectLocalPeer,selectPeers
} from "@100mslive/hms-video-react";
import ControlBar from "./ControlBar";


const Room = () =>{
    const localPeer = useHMSStore(selectLocalPeer)
    const peers = useHMSStore(selectPeers);

    return (
      <div className="flex flex-col">
      <div className="flex bg-gray-900 w-screen min-h-screen p-2 flex-wrap">
        {localPeer && <VideoTiles peer={localPeer} isLocal={true} />}
        {peers &&
          peers
            .filter((peer) => !peer.isLocal)
            .map((peer) => {
              return (
                <>
                  <VideoTiles isLocal={false} peer={peer} />
                </>
              );
            })}
      </div>
      <ControlBar />
    </div>
  );
};
export default Room