import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePeerContext } from "./peer-provider";

const HomePage = () => {
  const myVideoRef = useRef();
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const { peerId } = usePeerContext();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false }) // get the video and audio from the user
      .then((stream) => {
        myVideoRef.current.srcObject = stream; // set the video to the current stream
      });
  }, []);

  const handleJoinRoom = () => {
    if (!roomId) return alert("Please enter a room id");
    navigate(`/call/${roomId}`);
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
              navigator.clipboard.writeText(peerId);
            }}
          >
            {peerId}
          </span>
        </p>
        {/* YOUR VIDEO  */}
        <video ref={myVideoRef} autoPlay />
        <input
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          type="text"
          placeholder="Other user's id"
        />
        <button onClick={handleJoinRoom}>Call</button>
      </div>
    </main>
  );
};
export default HomePage;
