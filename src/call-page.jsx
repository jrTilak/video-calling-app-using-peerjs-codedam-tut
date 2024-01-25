import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
const CallPage = () => {
  const navigate = useNavigate();
  const { remoteUserId } = useParams();
  const myVideoRef = useRef();
  const remoteUserVideoRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false }) // get the video and audio from the user
      .then((stream) => {
        myVideoRef.current.srcObject = stream; // set the video to the current stream
      });
  }, []);

  const handleLeaveRoom = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <main>
      <div className="main">
        <p id="remoteUserId">You are chatting with : {remoteUserId}</p>
        <div className="videos">
          {/* YOUR VIDEO  */}
          <div className="videoContainer">
            <span>peerId</span>
            <video ref={myVideoRef} autoPlay />
          </div>

          {/* OTHER USERS VIDEO  */}
          <div className="videoContainer">
            <span>Waiting for the other user to join</span>
            <video ref={remoteUserVideoRef} autoPlay />
          </div>
        </div>
        <button onClick={handleLeaveRoom}>End Call</button>
      </div>
    </main>
  );
};
export default CallPage;
