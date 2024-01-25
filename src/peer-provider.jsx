import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import Peer from "peerjs";

export const PeerContextProvider = ({ children }) => {
  const [peer, setPeer] = useState(null);
  const [peerId, setPeerId] = useState();
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

    return () => {
      peer?.destroy();
    };
  }, []);
  const PeerContextValue = {
    peer,
    peerId,
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
