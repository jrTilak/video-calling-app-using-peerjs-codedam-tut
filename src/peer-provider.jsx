import { createContext, useContext, useEffect } from "react";

export const PeerContextProvider = ({ children }) => {
  const PeerContextValue = {};

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
