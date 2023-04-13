import React from "react";

import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav>
      <div className="flex flex-row items-center h-20 bg-blue-800 w-screen text-white">
        <Link to="/" className="text-white text-xl px-5 whitespace-nowrap">
          App Name
        </Link>
        <div className="text-slate-300 space-x-5 mx-10 w-screen">
          {user ? (
            <React.Fragment>
              <Link className="hover:text-slate-100" to="/">
                Home
              </Link>
              <Link className="hover:text-slate-100" to="/protected">
                Protected Page
              </Link>
              <Link className="hover:text-slate-100" to="/chats">
                Conversations
              </Link>
              <Link className="hover:text-slate-100" to="/conversations">
                Active Conversations
              </Link>
              <Link className="hover:text-slate-100" to="/chats/abc">
                Create room
              </Link>
              <button
                className="float-right hover:text-slate-100"
                onClick={logout}
              >
                Logout
              </button>
            </React.Fragment>
          ) : (
            <div className="space-x-5 float-right">
              <Link className="hover:text-slate-100" to="/register">
                Register
              </Link>
              <Link className="hover:text-slate-100" to="/login">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
