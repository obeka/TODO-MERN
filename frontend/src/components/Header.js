import React, {useContext} from "react";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { AuthContext } from "../context/auth-context";

import useStyles from "../styles/material-ui";
function Header() {
    const classes = useStyles();
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = () => {
      console.log("asdsad");
      auth.logout()
      history.push("/auth")
    }

  return (
    <>
      <AppBar position="static" className={classes.headerContainer}>
        <Toolbar className={classes.header}>
          <Typography variant="h6">TV2Z</Typography>
          <Typography variant="h6">My Personal Todo Agent</Typography>
          <Button color="inherit" onClick={logoutHandler}>logout</Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
