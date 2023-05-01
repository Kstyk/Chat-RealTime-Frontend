import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Message = ({ message }) => {
  const { user } = useContext(AuthContext);

  function formatMessageTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString().slice(0, 5);
  }

  return (
    <li
      className={classNames(
        "mt-1 mb-1 flex",
        user?.email === message.to_user.email ? "justify-start" : "justify-end"
      )}
    >
      <div className="flex flex-col">
        <div
          className={classNames(
            "relative max-w-xl rounded-lg px-2 py-1 text-gray-700 shadow",
            user?.email === message.to_user.email
              ? "bg-gray-200"
              : "bg-gray-100"
          )}
        >
          <div className="flex items-end">
            <span className="block">{message.content}</span>
            <span
              className="ml-2"
              style={{
                fontSize: "0.6rem",
                lineHeight: "1rem",
              }}
            >
              {formatMessageTimestamp(message.timestamp)}
            </span>
          </div>
        </div>
        <span className="text-xs">Sended by {message.from_user.email}</span>
      </div>
    </li>
  );
};

export default Message;
