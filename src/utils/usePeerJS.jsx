import React, { useEffect, useState, useContext, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { AuthContext } from "../context/AuthContext";

import Peer from "peerjs";

const usePeerJS = (conversationName) => {
  const [peerId, setPeerId] = useState("");
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [callButton, setCallButton] = useState(null);

  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const { user } = useContext(AuthContext);

  const { sendJsonMessage } = useWebSocket(
    user ? `ws://127.0.0.1:8000/${conversationName}/` : null,
    {
      queryParams: {
        token: user ? user.token : "",
      },
      onMessage: (e) => {
        const data = JSON.parse(e.data);
        switch (data.type) {
          case "received_peer":
            setRemotePeerIdValue(data.peer);
            console.log(data.peer);
            setCallButton(true);
            break;
          default:
            // bash.error("Unknown message type!");
            break;
        }
      },
    }
  );

  function startVideoCall() {
    const peer = new Peer();

    peer.on("open", (id) => {
      setPeerId(id);
      setIsOpen(true);

      // console.log(id);
      sendJsonMessage({
        type: "peer",
        peer: id,
        token: user.token,
      });
    });

    peer.on("call", (call) => {
      var getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      getUserMedia({ video: true, audio: true }, (mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
        call.answer(mediaStream);
        call.on("stream", function (remoteStream) {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
      });
    });

    peer.on("close", () => {
      console.log("Zakończono połączenie");
    });

    peerInstance.current = peer;
  }

  const call = (remotePeerId) => {
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true }, (mediaStream) => {
      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();

      const call = peerInstance.current.call(remotePeerId, mediaStream);

      call.on("stream", (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
      });
    });
  };

  return {
    call,
    startVideoCall,
    remotePeerIdValue,
    setRemotePeerIdValue,
    peerId,
    setPeerId,
    remoteVideoRef,
    currentUserVideoRef,
    peerInstance,
    modalIsOpen,
    setIsOpen,
    callButton,
    setCallButton,
  };
};

export default usePeerJS;
