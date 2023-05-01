import React, { useEffect, useContext } from "react";
import useAxios from "../utils/useAxios";
import { useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const StartedRoomsPage = () => {
  const api = useAxios();
  const [rooms, setRooms] = useState([]);

  const { user } = useContext(AuthContext);

  const fetchYourRooms = async () => {
    await api
      .get("/api/rooms/all-rooms/")
      .then((res) => {
        console.log(res.data);
        setRooms(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchYourRooms();
  }, []);

  return (
    <ul>
      {rooms.map((room) => (
        <li key={room.room_id}>
          {room.users.map((u) =>
            u.email != user.email ? (
              <Link to={`/rooms/${room.room_id}/`}>
                {u.first_name} {u.last_name} - {u.email}
              </Link>
            ) : (
              ""
            )
          )}
        </li>
      ))}
    </ul>
  );
};

export default StartedRoomsPage;
