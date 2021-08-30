import React, { useEffect } from "react";
import {
  useHMSActions,
  useHMSStore,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  selectIsConnectedToRoom,
  selectIsLocalScreenShared,
} from "@100mslive/hms-video-react";

const ControlBar = () => {
  const hmsActions = useHMSActions();
  const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const isLocalVideoEnabled = useHMSStore(selectIsLocalVideoEnabled);
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const toggleAudio = async () => {
    await hmsActions.setLocalAudioEnabled(!isLocalAudioEnabled);
  };
  const toggleVideo = async () => {
    await hmsActions.setLocalVideoEnabled(!isLocalVideoEnabled);
  };
  useEffect(() => {
    window.onunload = () => {
        if (isConnected){
      hmsActions.leave();}
    };
  }, [hmsActions, isConnected]);

  const isLocalScreenShared = useHMSStore(selectIsLocalScreenShared);
  const toggleShare = async () => {
    await hmsActions.setScreenShareEnabled(!isLocalScreenShared);
  }
  return (
    <div className="fixed bottom-0 h-10 bg-gray-400 w-screen flex items-center justify-center">
      <button
        className="text-xs uppercase tracking-wider bg-white py-1 px-2 rounded-lg shadow-lg text-indigo-500 mr-2"
        onClick={toggleAudio}
      >
        {isLocalAudioEnabled ? "Mute" : "Unmute"}
      </button>
      <button
        className="text-xs uppercase tracking-wider bg-white py-1 px-2 rounded-lg shadow-lg text-indigo-500"
        onClick={toggleVideo}
      >
        {isLocalVideoEnabled ? "Hide" : "Unhide"}
      </button>

      <button
        className="text-xs uppercase tracking-wider bg-white py-1 px-2 rounded-lg shadow-lg text-indigo-500 mr-2"
        onClick={toggleShare}
      >
        {isLocalScreenShared ? "Share" : "Noshare"}
      </button>
      <img
        className="logo"
        src="https://ashwins93.app.100ms.live/static/media/100ms_logo.3cfd8818.svg"
        alt="logo"
      />
      {isConnected && (
        <button
          id="leave-btn"
          class="btn-danger"
          onClick={() => hmsActions.leave()}
        >
          Leave Room
        </button>
      )}
  );

   </div>
  );
};

export default ControlBar;