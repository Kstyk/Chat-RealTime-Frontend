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

  return (
    <section className="bg-white h-full flex pt-10">
      <div className="w-8/12 m-auto h-full">
        <h1 className="font-semibold text-2xl pb-3 border-b-2">Twój profil</h1>

        <div>ProfilePage - Hey {user && user.email}</div>
      </div>
    </section>
  );
};

export default ProfilePage;
