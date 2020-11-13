import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import useStyles from "../styles/material-ui";

import { AuthContext } from "../context/auth-context";


function Header() {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = () => {
    auth.logout();
    history.push("/auth");
  };

  return (
    <>
      <AppBar position="static" className={classes.headerContainer}>
        <Toolbar className={classes.header}>
          <img
            src="https://i.postimg.cc/TPLwgVQj/todoLogo.png"
            alt="logo"
            className={classes.logo}
          />
          <Typography variant="h6" className={classes.headerText}>
           All todos, in one place.
          </Typography>
          <Button
            color="inherit"
            className={classes.headerText}
            onClick={logoutHandler}
          >
            <ExitToAppIcon className={classes.headerIcon}/>
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
