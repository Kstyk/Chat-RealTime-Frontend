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
      .get("/api/rooms/users-without-room/")
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
    <div className="bg-white h-full flex pt-10">
      <div className="w-8/12 m-auto h-full">
        <h1 className="font-semibold text-2xl pb-3 border-b-2">Stwórz pokój</h1>
        {error != null ? (
          <div className="bg-red-300 w-100 h-10">{error}</div>
        ) : (
          ""
        )}
        <ul>
          {users.map((user) => (
            <li
              key={user.email}
              onClick={() => setSelectedUserEmail(user.email)}
              className={
                selectedUserEmail == user.email
                  ? "pt-2 pb-2 border-b-2 font-bold"
                  : "pt-2 pb-2 border-b-2 cursor-pointer"
              }
            >
              {user.email}
            </li>
          ))}
        </ul>
        <button
          className="border-2 w-2/12 pt-2 pb-2 mt-5 hover:border-blue-800"
          onClick={createRoom}
        >
          <span>Stwórz pokój</span>
        </button>
      </div>
    </div>
  );
};

export default CreateRoomPage;
