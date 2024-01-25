import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PeerContextProvider } from "./providers/peer-provider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PeerContextProvider>
        <App />
      </PeerContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
