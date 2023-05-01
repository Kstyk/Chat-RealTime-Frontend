import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import { useState } from "react";

const ProfilePage = () => {
  const [users, setUsers] = useState([]);
  let { user, authTokens } = useContext(AuthContext);

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

  return <div>ProfilePage - Hey {user && user.email}</div>;
};

export default ProfilePage;
