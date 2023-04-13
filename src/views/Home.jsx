import React, { useContext } from "react";
import UserInfo from "../views/UserInfo";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <motion.section
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.2 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="mb-auto w-full h-screen rounded-2xl border-blue-800 bg-slate-300 mx-auto px-10 py-5"
    >
      {user && <UserInfo user={user} />}
      <h1 className="text-3xl">You are on home page!</h1>
    </motion.section>
  );
};

export default Home;
