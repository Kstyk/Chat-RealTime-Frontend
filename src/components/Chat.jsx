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

  const { conversationName } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  //modal

  // videocall
  const {
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
  } = usePeerJS(conversationName);

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
      <span>The WebSocket is currently {connectionStatus}</span>
      <hr />
      <input
        type="text"
        name="message"
        placeholder="message"
        onChange={handleChangeMessage}
        value={message}
        className="shadow-sm sm:text-sm border-gray-300 bg-gray-100 rounded-md"
      />
      <button className="ml-3 bg-gray-300 px-3 py-1" onClick={handleSubmit}>
        Submit
      </button>
      <button className="ml-3 bg-gray-300 px-3 py-1" onClick={startVideoCall}>
        Call
      </button>
      {callButton == true ? (
        <button
          className="ml-3 bg-gray-300 px-3 py-1"
          onClick={(e) => openModal()}
        >
          Answer call
        </button>
      ) : (
        ""
      )}
      {callButton == true ? (
        <button
          className="ml-3 bg-gray-300 px-3 py-1"
          onClick={(e) => setCallButton(null)}
        >
          End call
        </button>
      ) : (
        ""
      )}
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
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div>
          <h1>Remote</h1>
          <video preload="none" ref={remoteVideoRef} />
        </div>
        <div>
          <h1>Yours</h1>
          <video preload="none" ref={currentUserVideoRef} />
        </div>
        <h1>Current user id is {peerId}</h1>
        <h1>Remote peer user id is {remotePeerIdValue}</h1>
      </Modal>
    </motion.div>
  );
};

export default Chat;
