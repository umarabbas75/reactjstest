import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTypedSelector } from "../hooks/useTypeSelector";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { ActionType } from "../redux/actionTypes/auth";

const Layout = ({ children }: any) => {
  const dispatch = useDispatch();

  let logInUser = JSON.parse(localStorage.getItem("userInfo") || "");

  console.log("========logInUser=======", logInUser);

  const logout = () => {
    dispatch({
      type: ActionType.LOGOUT_USER,
    });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative">
        <Toolbar
          sx={{ width: "100%", justifyContent: "flex-end", gap: "10px" }}
        >
          <Typography variant="h6" color="inherit" noWrap>
            {logInUser?.email}
          </Typography>
          <Button variant="contained" color="secondary" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
};

export default Layout;
