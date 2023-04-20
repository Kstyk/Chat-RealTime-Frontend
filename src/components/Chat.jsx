import React, { useState, useContext, useRef, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import Message from "./Message";
import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";
import Peer from "peerjs";
import ChatLoader from "./ChatLoader";
import Modal from "react-modal";
import usePeerJS from "../utils/usePeerJS";

Modal.setAppElement("#root");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);
  const [page, setPage] = useState(2);
  const [hasMoreMessages, setHasMoreMessages] = useState(false);
  const [users, setUsers] = useState([]);

  const { conversationName } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  //modal

  // videocall
  const {
    peerId,
    call,
    startVideoCall,
    remotePeerIdValue,
    setRemotePeerIdValue,
    remoteVideoRef,
    currentUserVideoRef,
    modalIsOpen,
    setIsOpen,
    callButton,
    setCallButton,
    toggleAudio,
    toggleCamera,
    audioEnabled,
    isCameraOn,
    isScreenSharing,
    toggleScreenSharing,
  } = usePeerJS(conversationName);

  useEffect(() => {
    async function fetchUsers() {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/chats/get-users/${conversationName}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      setUsers(res.data);
    }

    fetchUsers();
  }, []);

  const { readyState, sendJsonMessage } = useWebSocket(
    user ? `ws://127.0.0.1:8000/${conversationName}/` : null,
    {
      queryParams: {
        token: user ? user.token : "",
      },
      onOpen: (e) => {
        console.log("connected");
      },
      onClose: (e) => {
        console.log("disconnected");
        // navigate("/");
      },
      onMessage: (e) => {
        const data = JSON.parse(e.data);
        switch (data.type) {
          case "chat_message_echo":
            setMessageHistory((prev) => [data.message, ...prev]);
            break;
          case "last_50_messages":
            setMessageHistory(data.messages);
            setHasMoreMessages(data.has_more);
            break;
          default:
            bash.error("Unknown message type!");
            break;
        }
      },
    }
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  async function fetchMessages() {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/messages/?conversation=${conversationName}&page=${page}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${user?.token}`,
        },
      }
    );

    if (res.status === 200) {
      const data = await res.data;
      // console.log(data);
      setHasMoreMessages(data.next !== null);
      setPage(page + 1);
      setMessageHistory((prev) => prev.concat(data.results));
    }
  }

  function handleChangeMessage(e) {
    setMessage(e.target.value);
  }

  function handleSubmit() {
    sendJsonMessage({
      type: "chat_message",
      message,
      name: user ? user.username : "",
    });
    setMessage("");
  }

  function openModal() {
    setIsOpen(true);

    startVideoCall();
    call(remotePeerIdValue);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
    setCallButton(false);
  }

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.2 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.2 },
      }}
      className="h-full"
    >
      {/* Token usera to: {user.token} */}
      <br />
      {/* {console.log("Websocket status: " + connectionStatus)} */}
      <hr />
      <h1 className="ml-5 text-2xl">
        Konwersujesz z{" "}
        {users.map((item) => {
          if (item.username != user.username) {
            return item.username;
          }
        })}
      </h1>
      <hr />
      <ul className="mt-3 flex flex-col-reverse relative w-full border border-gray-200 overflow-y-auto p-6"></ul>
      <div
        id="scrollableDiv"
        className="h-[30rem] mt-3 flex flex-col-reverse relative w-full border border-gray-200 overflow-y-auto p-6"
      >
        <div>
          <InfiniteScroll
            dataLength={messageHistory.length}
            next={fetchMessages}
            className="flex flex-col-reverse"
            inverse={true}
            hasMore={hasMoreMessages}
            loader={<ChatLoader />}
            scrollableTarget="scrollableDiv"
          >
            {messageHistory.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
      {/* przyciski */}
      <div className="mt-5 ml-5">
        <input
          type="text"
          name="message"
          placeholder="message"
          onChange={handleChangeMessage}
          value={message}
          className="shadow-sm sm:text-sm border-gray-300 bg-gray-100 rounded-none h-10 w-6/12 pl-5"
        />
        <button
          className="ml-3 bg-gray-100 px-3 py-1 h-10 "
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className="ml-3 bg-gray-100 px-3 py-1 h-10 "
          onClick={startVideoCall}
        >
          Call
        </button>
        {callButton == true ? (
          <button
            className="ml-3 bg-gray-100 px-3 py-1 h-10 "
            onClick={(e) => openModal()}
          >
            Answer call
          </button>
        ) : (
          ""
        )}
        {callButton == true ? (
          <button
            className="ml-3 bg-gray-100 px-3 py-1 h-10 "
            onClick={(e) => setCallButton(null)}
          >
            End call
          </button>
        ) : (
          ""
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="bg-black flex flex-row relative"
        style={{
          content: {
            height: "94vh",
            marginTop: "3vh",
            marginBottom: "3vh",
            width: "94%",
            marginLeft: "3%",
            marginRight: "3%",
          },
        }}
      >
        <div className="h-full w-10/12 ">
          <video
            preload="none"
            ref={remoteVideoRef}
            className="w-full h-full"
          />
        </div>
        <div className="w-2/12 bg-slate-500 h-full flex flex-col justify-between text-lg uppercase font-semibold">
          <div className="border-b-2 border-white h-1/4 flex justify-center items-center hover:bg-slate-700">
            Zakończ połączenie
          </div>
          <div
            onClick={() => toggleCamera()}
            className="border-b-2 border-white h-1/4 flex justify-center items-center hover:bg-slate-700"
          >
            {isCameraOn ? "Wyłącz" : "Włącz"} kamerę
          </div>
          <div
            onClick={() => toggleAudio()}
            className="border-b-2 border-white h-1/4 flex justify-center items-center hover:bg-slate-700"
          >
            {audioEnabled ? "Wyłącz" : "Włącz"} mikrofon
          </div>
          <div
            onClick={() => toggleScreenSharing()}
            className="h-1/4 flex justify-center items-center hover:bg-slate-700"
          >
            {isScreenSharing ? "Zakończ udostępnianie" : "Udostępnij ekran"}
          </div>
        </div>
        <video
          preload="none"
          ref={currentUserVideoRef}
          className="absolute bottom-0 left-0 w-2/12"
        />
      </Modal>
    </motion.div>
  );
};

export default Chat;
