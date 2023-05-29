import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
// import "../styles/button.css";

const LoginPage = () => {
  let { loginUser, error } = useContext(AuthContext);

  return (
    <section className="bg-white h-full flex justify-center pt-10">
      <form
        onSubmit={loginUser}
        className="flex flex-col space-y-4 w-8/12 m-auto h-full"
      >
        <div className="errors">{error}</div>
        <h1 className="font-semibold text-2xl pb-3 border-b-2">Login </h1>

        <div className="items-center">
          <label className="float-left text-xl" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className="float-right w-2/4 h-10 px-2 border-b-2"
            name="email"
            placeholder="Wprowadź email"
          />
        </div>
        <div className="items-center">
          <label className="float-left text-xl" htmlFor="password">
            Hasło
          </label>
          <input
            type="password"
            className="float-right w-2/4 h-10 px-2 border-b-2"
            name="password"
            placeholder="Wprowadź hasło"
          />
        </div>
        <hr />
        <button
          className="border-2 w-2/12 pt-2 pb-2 hover:border-blue-800"
          type="submit"
        >
          <span className="text">Login</span>
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
