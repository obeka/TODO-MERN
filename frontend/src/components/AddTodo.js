import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Box from "@material-ui/core/Box";
import DialogTitle from "@material-ui/core/DialogTitle";
import useStyles from "../styles/material-ui";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "./Alert";

import { AuthContext } from "../context/auth-context";
import axios from "axios";
import useForm from "../hook/form-hook";

export default function FormDialog(props) {
  const classes = useStyles();
  const { setCount } = props;
  const [isLoading, setIsLoading] = useState(false);
  const auth = useContext(AuthContext);
  const [alert, setAlert] = useState({
    hasAlert: false,
    alertMsg: {},
    severity: "",
  });
  const { formState, inputHandler, inputSelectHandler } = useForm({
    todoName: "",
    date: "",
    label: "",
  });
  const { open, handleClose } = props;
  const tags = ["Urgent","Education", "Shopping", "Work", "Fun", "Concert", "Health", "Meeting", "Business", "Interview", "Course", "Family"];
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/todo/new`,
        formState,
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      if (response.status === 201) {
        setCount((prev) => prev + 1);
        setIsLoading(false);
        setAlert({
          hasAlert: true,
          alertMsg: "Success : Todo added!",
          severity: "success",
        });
      }
    } catch (error) {
      setAlert({
        hasAlert: true,
        alertMsg: "Failure : Todo can not be added!",
        severity: "warning",
      });
      setIsLoading(false);
    }

    formState.todoName = "";
    formState.date = "";
    formState.label = "";
    handleClose();
  };

  return (
    <div>
      {alert.hasAlert && <Alert alert={alert} setAlert={setAlert} />}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a new todo</DialogTitle>
        <form
          className={classes.formControl}
          noValidate
          autoComplete="off"
          onSubmit={submitHandler}
        >
          <TextField
            autoFocus
            margin="dense"
            id="todoName"
            label="Todo Name"
            type="text"
            fullWidth
            onChange={inputHandler}
          />
          <Box component="div" className={classes.boxContainer}>
            <TextField
              id="date"
              label="Date and time"
              type="datetime-local"
              //defaultValue={now}
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.box}
              onChange={inputHandler}
            />
            <Autocomplete
              id="label"
              options={tags}
              renderInput={(params) => (
                <TextField {...params} label="Tag" variant="outlined" />
              )}
              className={classes.box}
              onInputChange={inputSelectHandler}
              freeSolo
              autoSelect
            />
          </Box>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              disabled={
                !(formState.todoName && formState.date && formState.label)
              }
            >
              Add
              {isLoading && (
                <>
                  <span>ing  </span>
                  <CircularProgress size={20} className={classes.loading} />
                </>
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
