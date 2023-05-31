import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <nav className="w-screen">
      <div className="flex flex-row items-center h-20 pl-10 pr-10 bg-blue-800 w-screen text-white">
        <Link to="/" className="text-white text-xl px-5 whitespace-nowrap">
          Strona główna
        </Link>
        {user ? (
          <div className="flex space-x-10 w-full">
            <Link to="/profile" className="px-[5px]">
              Profil
            </Link>
            <Link to="/create-room" className=" px-[5px]">
              Stwórz nowy pokój
            </Link>
            <Link to="/my-rooms" className=" px-[5px]">
              Twoje pokoje
            </Link>
            <Link to="/login" onClick={logoutUser} className=" px-[5px]">
              Logout
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login" className=" px-[5px]">
              Login
            </Link>
            <Link to="/register" className=" px-[5px]">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
