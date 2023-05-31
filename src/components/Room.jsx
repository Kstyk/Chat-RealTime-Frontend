import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Chat from "./Chat";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";

const Room = () => {
  const [value, setValue] = useState("1");
  const [receiver, setReceiver] = useState(null);
  const { roomId } = useParams();
  const { user, authTokens } = useContext(AuthContext);
  let api = useAxios();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchReceiver = async () => {
    await api.get(`api/rooms/${roomId}`).then((res) => {
      const users = res.data.users;
      users.map((u) => (u != user.email ? setReceiver(u) : ""));
    });
  };

  useEffect(() => {
    fetchReceiver();
  }, []);

  return (
    <Box
      sx={{ width: "100%", typography: "body1" }}
      className="bg-white h-full"
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList aria-label="lab API tabs example" onChange={handleChange}>
            <Tab label="Czat" value="1" />
            <Tab label="Pliki" value="2" />
            <Tab label="Ustawienia" value="3" />
            <Tab label={receiver} disabled className="!ml-auto" />
          </TabList>
        </Box>
        <TabPanel value="1" className="!p-0">
          <Chat />
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
};

export default Room;
