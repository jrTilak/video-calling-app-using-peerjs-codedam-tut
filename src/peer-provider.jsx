import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
import Peer from "peerjs";

export const PeerContextProvider = ({ children }) => {
  const [peer, setPeer] = useState(null);
  const [peerId, setPeerId] = useState();
  const [remoteUserVideo, setRemoteUserVideo] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const peer = new Peer();
    peer.on("open", (id) => {
      console.log("peer id", id);
      setPeerId(id);
    });
    setPeer(peer);
    peer?.on("error", (err) => {
      console.log("peer error", err);
    });
    peer?.on("call", (call) => {
      navigate(`/call/${call.peer}`);
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false }) // get the video and audio from the user
        .then((stream) => {
          call.answer(stream); // Answer the call with an A/V stream.
          call.on("stream", (remoteStream) => {
            // Show stream in some video/canvas element.
            setRemoteUserVideo(remoteStream);
          });
          call.on("close", () => {
            // Handle call close event
            console.log("Call ended");
            setRemoteUserVideo(null);
            navigate("/");
          });
        });
    });

    return () => {
      peer?.destroy();
    };
  }, []);
  const PeerContextValue = {
    peer,
    peerId,
    remoteUserVideo,
  };

  return (
    <PeerContext.Provider value={PeerContextValue}>
      {children}
    </PeerContext.Provider>
  );
};

// Create the peer context
export const PeerContext = createContext(undefined);

//
export const usePeerContext = () => {
  const context = useContext(PeerContext);
  if (!context) {
    throw new Error("usePeerContext must be used within an PeerProvider");
  }
  return context;
};
