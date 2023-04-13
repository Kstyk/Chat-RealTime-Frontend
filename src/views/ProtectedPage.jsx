import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const ProtectedPage = () => {
  const [res, setRes] = useState("");
  const { user } = useContext(AuthContext);

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
      <h1>Projected Page</h1>
      <h2>
        {user.id}: {user.username}
      </h2>
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <hr className="mt-10" />
      <p>{res}</p>
    </motion.div>
  );
};

export default ProtectedPage;
