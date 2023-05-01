import React, { useState, useContext, useReducer } from "react";
import { AuthContext } from "../context/AuthContext";
import { reducer, initialState } from "../reducers/RegisterReducer";

const Register = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { register, errors } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    register(state.username, state.password, state.email, state.phone);
  };

  return (
    <section className="mb-auto w-10/12 rounded-2xl border-blue-800 bg-slate-100 mx-auto px-10 py-5">
      <h2>{errors ? Object.values(errors).map((e) => <p>{e}</p>) : ""}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <h1 className="font-semibold text-2xl">Register</h1>
        <hr />
        <div className="items-center">
          <label className="float-left text-xl" htmlFor="username">
            Username
          </label>
          <input
            className="float-right w-2/3 h-10 px-2"
            type="text"
            id="username"
            onChange={(e) =>
              dispatch({ type: "SET_USERNAME", payload: e.target.value })
            }
            placeholder="Username"
            required
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
            onChange={(e) =>
              dispatch({ type: "SET_PASSWORD", payload: e.target.value })
            }
            placeholder="Password"
            required
          />
        </div>
        <div className="items-center">
          <label className="float-left text-xl" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            className="float-right w-2/3 h-10 px-2"
            type="password"
            id="confirm-password"
            onChange={(e) =>
              dispatch({ type: "SET_PASSWORD2", payload: e.target.value })
            }
            placeholder="Confirm Password"
            required
          />
          <p>
            {state.password2 !== state.password ? "Passwords do not match" : ""}
          </p>
        </div>
        <div className="items-center">
          <label className="float-left text-xl" htmlFor="email">
            Email
          </label>
          <input
            className="float-right w-2/3 h-10 px-2"
            type="email"
            id="email"
            onChange={(e) =>
              dispatch({ type: "SET_EMAIL", payload: e.target.value })
            }
            placeholder="Email"
          />
        </div>
        <div className="items-center">
          <label className="float-left text-xl" htmlFor="phone_number">
            Phone number
          </label>
          <input
            className="float-right w-2/3 h-10 px-2"
            type="text"
            id="phone_number"
            onChange={(e) =>
              dispatch({ type: "SET_PHONE", payload: e.target.value })
            }
            required
            placeholder="Phone number"
          />
        </div>
        <button className="text-blue-800 hover:text-white w-1/6 bg-white hover:bg-blue-800 border border-blue-800">
          Register
        </button>
      </form>
    </section>
  );
};

export default Register;
