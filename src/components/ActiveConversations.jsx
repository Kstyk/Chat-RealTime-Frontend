import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

import { AuthContext } from "../context/AuthContext";

const ActiveConversations = () => {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      const res = await axios
        .get("http://127.0.0.1:8000/api/conversations/", {
          headers: {
            Authorization: `${user?.token}`,
          },
        })
        .then((res) => {
          const data = res.data;
          setConversations(data);
        })
        .catch((e) => {
          console.log("Invalid token");
          setError(["Nieudana autoryzacja użytkownika"]);
        });
    }
    fetchUsers();
  }, [user]);

  function createConversationName(username) {
    const namesAlph = [user?.username, username].sort();
    return `${namesAlph[0]}_${namesAlph[1]}`;
  }

  function formatMessageTimestamp(timestamp) {
    if (!timestamp) return;
    const date = new Date(timestamp);
    return date.toLocaleDateString().slice(0, 5);
  }

  function checkUsername(name) {
    const other = name.split("_");
    if (other[0] == user.username) return other[1];
    return other[0];
  }
  console.log(conversations);
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.2 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.2 },
      }}
      className="mb-auto w-full h-full rounded-2xl border-blue-800 bg-slate-300 mx-auto px-10 py-5 overflow-auto"
    >
      {error != null ? (
        <p>{error[0]}</p>
      ) : conversations.length === 0 ? (
        <p>Pobieranie danych...</p>
      ) : (
        conversations.map((c) => (
          <Link to={`/chats/${c.name}`} key={checkUsername(c.name)}>
            <div className="border border-gray-200 w-full p-3">
              <h3 className="text-xl font-semibold text-gray-800">
                {checkUsername(c.name)}
              </h3>
              <div className="flex justify-between">
                <p className="text-gray-700">{c.last_message?.content}</p>
                <p className="text-gray-700">
                  {formatMessageTimestamp(c.last_message?.timestamp)}
                </p>
              </div>
            </div>
          </Link>
        ))
      )}
    </motion.div>
  );
};

export default ActiveConversations;
