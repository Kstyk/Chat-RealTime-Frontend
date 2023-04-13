import React from "react";

const useChat = () => {
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
          case "received_peer":
            setRemotePeerIdValue(data.peer);
            console.log(data.peer);
            setCallButton(true);
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
  return <div>useChat</div>;
};

export default useChat;
