import React from "react";
import { Route, Navigate, Routes, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const PrivateRoom = ({ children }) => {
  let { user } = useContext(AuthContext);
  const { conversationName } = useParams();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function authenticateUser() {
      const res = await axios
        .get(
          `http://127.0.0.1:8000/api/chats/${conversationName}/check_user/`,
          {
            headers: {
              Authorization: `Token ${user?.token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.status);
          setStatus(res.status);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e.response.status);
          console.log("Invalid token");
          setStatus(e.response.status);
          setLoading(false);
        });
    }
    authenticateUser();
  }, [user]);

  console.log(conversationName);
  console.log(status == 200);

  if (loading) return <></>;
  else {
    return status == 200 ? <>{children}</> : <Navigate to="/" />;
  }
};

export default PrivateRoom;
