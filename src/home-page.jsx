import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router";

const HomePage = () => {
  const myVideoRef = useRef();
  const [remoteUserId, setRemoteUserId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        myVideoRef.current.srcObject = stream;
      });
  }, []);

  const handleCall = () => {
    if (!remoteUserId) {
      alert("Please enter the remote user id");
      return;
    }
    navigate(`/call/${remoteUserId}`);
  };

  return (
    <main>
      <div className="main">
        <h1>Welcome to ChatApp</h1>
        <p>Enter the id the person you want to chat with</p>
        <p>
          Your id is{" "}
          <span
            id="peerId"
            onClick={() => {
              // navigator.clipboard.writeText(peerId);
            }}
          >
            peerId
          </span>
        </p>
        {/* YOUR VIDEO  */}
        <video ref={myVideoRef} autoPlay />
        <input
          value={remoteUserId}
          onChange={(e) => {
            setRemoteUserId(e.target.value);
          }}
          type="text"
          placeholder="Other user's id"
        />
        <button onClick={handleCall}>Call</button>
      </div>
    </main>
  );
};

export default HomePage;
