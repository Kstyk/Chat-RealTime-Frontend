import axios, { AxiosError } from "axios";
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import authHeader from "../services/AuthHeaders";
import AuthService from "../services/AuthService";

const DefaultProps = {
  login: () => null,
  logout: () => null,
  register: () => null,
  authAxios: axios,
  user: null,
};

export const UserModel = {
  id: "",
  username: "",
  token: "",
};

export const AuthContext = createContext(DefaultProps);

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => AuthService.getCurrentUser());
  const [errors, setErrors] = useState(null);

  async function login(username, password) {
    try {
      const data = await AuthService.login(username, password);
      setUser(data);
      // return data;
      navigate("/");
    } catch (e) {
      if (e.code === "ERR_BAD_REQUEST") {
        setErrors(e.response.data);
        // console.log(e.response.data);
        // console.log(typeof e.response.data);
      }
    }
  }

  async function register(username, password, email, phone_number) {
    try {
      const data = await AuthService.register(
        username,
        password,
        email,
        phone_number
      );
      navigate("login");
    } catch (e) {
      if (e.code === "ERR_BAD_REQUEST") {
        setErrors(e.response.data);
        // console.log(e.response.data);
        // console.log(typeof e.response.data.username);
      }
    }
  }

  function logout() {
    AuthService.logout();
    setUser(null);
    navigate("/login");
  }

  // axios instance for making requests
  const authAxios = axios.create();

  // request interceptor for adding token
  authAxios.interceptors.request.use((config) => {
    // add token to request headers
    config.headers = authHeader();
    return config;
  });

  authAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, errors, authAxios }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
