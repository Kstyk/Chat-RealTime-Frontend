import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Conversations = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      const res = await axios.get("http://127.0.0.1:8000/api/users/", {
        headers: {
          Authorization: `Token ${user?.token}`,
        },
      });

      const data = await res.data;
      setUsers(data);
    }
    fetchUsers();
  }, [user]);

  function createConversationName(username) {
    const namesAlph = [user?.username, username].sort();
    return `${namesAlph[0]}_${namesAlph[1]}`;
  }

  const createConversation = async (student) => {
    const conversationName = createConversationName(student.username);
    console.log(student);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/conversations/",
        {
          name: conversationName,
          student: student.username,
        },
        {
          headers: {
            Authorization: `${user?.token}`,
          },
        }
      );
      navigate("/conversations");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.2 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.2 },
      }}
      className="mb-auto w-full h-screen rounded-2xl border-blue-800 bg-slate-300 mx-auto px-10 py-5 overflow-auto"
    >
      {users
        .filter((u) => u.username !== user?.username)
        .map((u) => (
          <div className="flex flex-row">
            <Link to={`/chats/${createConversationName(u.username)}`}>
              <div key={u.username}>{u.username}</div>
            </Link>
            <button
              className="btn btn-primary border border-black"
              onClick={(e) => createConversation(u)}
            >
              Stwórz
            </button>
          </div>
        ))}
    </motion.div>
  );
};

export default Conversations;
