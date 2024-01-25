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
    peer.on("disconnected", () => {
      console.log("peer disconnected");
      navigate("/");
      window.location.reload();
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
