import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddTodo from "./AddTodo";

import useStyles from "../styles/material-ui";

function Banner(props) {
  const classes = useStyles();
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
        <Typography variant="h4">My Personel Todo Agent</Typography>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add Todo
        </Button>
      </Grid>
        <div>
          <AddTodo open={open} handleClose={handleClose} setCount={setCount} />
        </div>
    </>
  );
}

export default Banner;
