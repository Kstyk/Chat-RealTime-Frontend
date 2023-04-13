import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login, errors } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && login(username, password);
  };

  return (
    <section className="mb-auto w-10/12 rounded-2xl border-blue-800 bg-slate-100 mx-auto px-10 py-5">
      <h2>{errors ? errors.non_field_errors : ""}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <h1 className="font-semibold text-2xl">Login </h1>
        <hr />
        <div className="items-center">
          <label className="float-left text-xl" htmlFor="username">
            Username
          </label>
          <input
            className="float-right w-2/3 h-10 px-2"
            type="text"
            id="username"
            placeholder="Enter Username"
          />
        </div>
        <div className="items-center">
          <label className="float-left text-xl" htmlFor="password">
            Password
          </label>
          <input
            className="float-right w-2/3 h-10 px-2"
            type="password"
            id="password"
            placeholder="Enter Password"
          />
        </div>
        <button
          className="text-blue-800 hover:text-white w-1/6 bg-white hover:bg-blue-800 border border-blue-800"
          type="submit"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
