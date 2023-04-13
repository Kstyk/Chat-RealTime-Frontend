import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import AuthContextProvider from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Register from "./views/Register";
import Login from "./views/Login";
import ProtectedPage from "./views/ProtectedPage";
import Chat from "./components/Chat";
import ActiveConversations from "./components/ActiveConversations";
import Conversations from "./components/Conversations";

import { AnimatePresence } from "framer-motion";
import PrivateRoom from "./utils/PrivateRoom";

function App() {
  const [count, setCount] = useState(0);
  const location = useLocation();

  return (
    <div className="flex flex-col bg-slate-300 w-screen h-screen">
      <AuthContextProvider>
        <Navbar />
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/protected"
              element={
                <PrivateRoute>
                  <ProtectedPage />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/chats"
              element={
                <PrivateRoute>
                  <Conversations />
                </PrivateRoute>
              }
            />
            <Route
              path="/conversations"
              element={
                <PrivateRoute>
                  <ActiveConversations />
                </PrivateRoute>
              }
            />
            <Route
              path="/chats/:conversationName"
              element={
                <PrivateRoom>
                  <Chat />
                </PrivateRoom>
              }
            />
            <Route path="/" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </AuthContextProvider>
      <Footer />
    </div>
  );
}

export default App;
