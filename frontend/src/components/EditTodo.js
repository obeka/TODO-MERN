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

import { AuthContext } from "../context/auth-context";

import axios from "axios";
import useForm from "../hook/form-hook";

export default function EditDialog(props) {
  const classes = useStyles();
  const { loadedEditTodo, setCount, id , setAlert} = props;
  console.log(loadedEditTodo);
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const { formState, inputHandler, inputSelectHandler } = useForm({
    todoName: loadedEditTodo.todoName,
    date: loadedEditTodo.date,
    label: loadedEditTodo.label,
  });
  const tags = ["Education", "Shopping", "Work", "Fun"];
  const { open, handleClose } = props;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const response = await axios.patch(
        `http://localhost:5000/todo/${id}`,
        formState,
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      if (response.status === 200) {
        setCount((prev) => prev + 1);
        setIsLoading(false)
        handleClose();
        setAlert({
          hasAlert: true,
          alertMsg: "Success : Todo updated!",
          severity: "info",
        });
      }
    } catch (err) {
      console.log(err);
      setAlert({
        hasAlert: true,
        alertMsg: "Failure : Todo can not be updated!",
        severity: "warning",
      });
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update the todo</DialogTitle>
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
            defaultValue={loadedEditTodo.todoName}
            onChange={inputHandler}
          />
          <Box component="div" className={classes.boxContainer} s>
            <TextField
              id="date"
              label="Date and time"
              type="datetime-local"
              defaultValue={loadedEditTodo.date.split(".")[0]}
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
              defaultValue={loadedEditTodo.label}
              className={classes.box}
              onChange={inputSelectHandler}
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
              UPDATE {isLoading && (
                <>
                  <span>ing  </span>
                  <CircularProgress size={20} />
                </>
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
