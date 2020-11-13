import React, { useState, useContext } from "react";

import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import useStyles from "../styles/material-ui";

import AddTodo from "./AddTodo";
import { AuthContext } from "../context/auth-context";

function Banner(props) {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const { setCount } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        className={classes.banner}
      >
        <Typography variant="h5">Welcome {auth.userName} .</Typography>
        <Button variant="contained"  onClick={handleClickOpen} className={classes.bannerButton}>
          Add Todo <AddCircleOutlineIcon className={classes.bannerIcon}/>
        </Button>
      </Grid>
        <div>
          <AddTodo open={open} handleClose={handleClose} setCount={setCount} />
        </div>
    </>
  );
}

export default Banner;
