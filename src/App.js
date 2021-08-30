//Sourced from https://www.youtube.com/watch?v=CGoB_DQIb7I
//https://github.com/aniketbehera/react...

import JoinForm from './Components/HMSRoomProvider/joinForm';
import Room  from './Components/HMSRoomProvider/Room'
import Header from "./Header";
import Footer from "./Footer"
import "./styles.css";
import Conference from "./Conference";
import { useEffect } from "react";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore
} from "@100mslive/hms-video-react";

const endPoint = "https://prod-in.100ms.live/hmsapi/qxf2training.app.100ms.live/";
const getToken = async (user_id) => {
  const response = await fetch(`${endPoint}api/token`, {
    method: "POST",
    //TODO remove env
    body: JSON.stringify({
      user_id,
      role: "trainee1",
      type: "app",
      room_id: "6124d804d91703e0375b7ae6",

    }),
  });

  const { token } = await response.json();

  return token;
}

const App = () => {
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const handleSubmit = async (userName) => {
    const token = await getToken(userName);
    hmsActions.join({ authToken: token, userName });
  };

  return (
    <>{isConnected ? <Room/> : <JoinForm handleSubmit={handleSubmit} />}</>
  )
};

export default App;