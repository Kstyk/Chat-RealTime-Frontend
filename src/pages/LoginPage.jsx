import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
  let { loginUser } = useContext(AuthContext);

  return (
    <section className="mb-auto w-10/12 rounded-2xl border-blue-800 bg-slate-100 mx-auto px-10 py-5 mt-10">
      <form onSubmit={loginUser} className="flex flex-col space-y-4">
        <h1 className="font-semibold text-2xl">Login </h1>
        <hr />
        <div className="items-center">
          <label className="float-left text-xl" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className="float-right w-2/3 h-10 px-2"
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
            className="float-right w-2/3 h-10 px-2"
            name="password"
            placeholder="Wprowadź hasło"
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

export default LoginPage;
