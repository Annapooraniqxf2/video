import React from "react"
import {
    useHMSActions,
    useHMSStore,
    selectScreenShareByPeerID
} from "@100mslive/hms-video-react";

const ScreenShare = ({peer, isLocal}) =>{
    const hmsActions = useHMSActions();
    const screenRef = React.useRef(null);
    const screenTrack = useHMSStore(selectScreenShareByPeerID(peer.id));

    React.useEffect(() =>  {
        (async () =>  {
        if (screenRef.current && screenTrack){
            if(screenTrack.enabled){
                await hmsActions.setScreenShareEnabled(true);
            }
        else {
            hmsActions.setScreenShareEnabled(false);

        }

        }
    })();
}, [screenTrack]);
return (
    <div className="flex m-1">
      <div className="relative">
        <screenshare
          ref={screenRef}
          autoPlay={false}
          playsInline
          muted={true}
          className={`object-cover h-64 w-64 rounded-lg shadow-lg ${
            isLocal ? "mirror" : ""
          }`}
        ></screenshare>
        <div className="top-0 w-full absolute flex justify-center">
          <div className="px-2 py-1 text-sm bg-gray-600 text-white mt-2 ml-2 rounded-lg">{`${peer.name}`}</div>
        </div>
      </div>
    </div>
  );

};

export default ScreenShare

