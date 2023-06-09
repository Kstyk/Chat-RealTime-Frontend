import React, { useEffect, useState, useContext, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import AuthContext from "../context/AuthContext";
import Peer from "peerjs";

const usePeerJS = (roomID) => {
  const [peerId, setPeerId] = useState("");
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [callButton, setCallButton] = useState(null);

  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);

  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const { user } = useContext(AuthContext);

  const { sendJsonMessage } = useWebSocket(
    user ? `ws://127.0.0.1:8000/${roomID}/` : null,
    {
      queryParams: {
        userId: user ? user.user_id : "",
      },
      onMessage: (e) => {
        const data = JSON.parse(e.data);
        switch (data.type) {
          case "received_peer":
            setRemotePeerIdValue(data.peer);
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

      console.log("before send");

      sendJsonMessage({
        type: "peer",
        peer: id,
        token: user.token,
      });

      console.log("after send");
    });

    peer.on("call", (call) => {
      var getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      getUserMedia({ video: true, audio: true }, (mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.onloadedmetadata = () => {
          currentUserVideoRef.current.play();
        };
        call.answer(mediaStream);
        call.on("stream", function (remoteStream) {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.onloadedmetadata = () => {
            remoteVideoRef.current.play();
          };
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
      currentUserVideoRef.current.onloadedmetadata = () => {
        currentUserVideoRef.current.play();
      };

      const call = peerInstance.current.call(remotePeerId, mediaStream, {
        metadata: {
          callerPeerId: peerId,
        },
      });

      call.on(
        "stream",
        (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.onloadedmetadata = () => {
            remoteVideoRef.current.play();
          };
          console.log("metadata:", call.metadata); // wyświetlenie obiektu metadata w konsoli
        },
        function (err) {
          console.log("Failed to get local stream", err);
        }
      );
    });
  };

  const toggleAudio = () => {
    console.log("remote peer: " + remotePeerIdValue);
    console.log("peer: " + peerId);

    setAudioEnabled(!audioEnabled);
    const audioTracks = currentUserVideoRef.current.srcObject.getAudioTracks();
    audioTracks.forEach((track) => {
      track.enabled = !track.enabled;
    });
  };

  const toggleCamera = () => {
    const tracks = currentUserVideoRef.current.srcObject.getTracks();
    tracks.forEach((track) => {
      if (track.kind === "video") {
        track.enabled = !isCameraOn;
        setIsCameraOn(!isCameraOn);
      }
    });
  };

  const toggleScreenSharing = async () => {
    try {
      if (!isScreenSharing) {
        console.log("remote peer id in sharing: " + remotePeerIdValue);
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        currentUserVideoRef.current.srcObject = stream;
        currentUserVideoRef.current.play();

        const call = peerInstance.current.call(remotePeerIdValue, stream);

        call.on("stream", (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });

        setIsScreenSharing(true);
      } else {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        currentUserVideoRef.current.srcObject = stream;
        currentUserVideoRef.current.play();

        const call = peerInstance.current.call(remotePeerIdValue, stream);
        call.on("stream", (remoteStream) => {
          tracks = remoteStream.getTracks();

          for (let i = 0; i < tracks.length; i++) {
            tracks[i].stop();
          }

          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });

        setIsScreenSharing(false);
      }
    } catch (err) {
      console.error("Error sharing screen:", err);
    }
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
    toggleAudio,
    toggleCamera,
    isCameraOn,
    audioEnabled,
    isScreenSharing,
    toggleScreenSharing,
  };
};

export default usePeerJS;
