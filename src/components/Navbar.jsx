import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <nav>
      <div className="flex flex-row items-center h-20 bg-blue-800 w-screen text-white">
        <Link to="/" className="text-white text-xl px-5 whitespace-nowrap">
          Home
        </Link>
        {user ? (
          <>
            <Link to="/profile" className="hover:text-slate-100 px-[5px]">
              Profile
            </Link>
            <Link to="/create-room" className="hover:text-slate-100 px-[5px]">
              Stwórz nowy pokój
            </Link>
            <Link to="/my-rooms" className="hover:text-slate-100 px-[5px]">
              Twoje pokoje
            </Link>
            <Link
              to="/login"
              onClick={logoutUser}
              className="hover:text-slate-100 px-[5px]"
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-slate-100 px-[5px]">
              Login
            </Link>
            <Link to="/register" className="hover:text-slate-100 px-[5px]">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
