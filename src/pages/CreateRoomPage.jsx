import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";

const CreateRoomPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUserEmail, setSelectedUserEmail] = useState(null);

  const nav = useNavigate();

  let api = useAxios();

  const fetchUsers = async () => {
    await api
      .get("/api/users/")
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createRoom = () => {
    console.log(selectedUserEmail);
    api
      .post("/api/rooms/", {
        user_email: selectedUserEmail,
      })
      .then((res) => {
        console.log(res.data);
        setError(null);
        nav("/my-rooms");
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.error);
      });
  };

  return (
    <div className="container pl-5 pt-5">
      {error != null ? (
        <div className="bg-red-300 w-100 h-10">{error}</div>
      ) : (
        ""
      )}
      <ul>
        {users.map((user) => (
          <li key={user.email} onClick={() => setSelectedUserEmail(user.email)}>
            {user.email}
          </li>
        ))}
      </ul>
      <button className="p-10 border-black border-2" onClick={createRoom}>
        Create room
      </button>
    </div>
  );
};

export default CreateRoomPage;
