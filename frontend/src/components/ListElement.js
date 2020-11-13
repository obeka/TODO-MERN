import React, { useState, useContext } from "react";
import moment from "moment";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Box from "@material-ui/core/Box";

import EditTodo from "./EditTodo";
import DeleteConfirmation from "./DeleteConfirmation";
import { AuthContext } from "../context/auth-context";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  listItem: {
    backgroundColor: "#c0cdce",
    marginBottom: 3,
    borderRadius: 5,
  },
  todoName: {
    width: "50%",
  },
  date: {
    width: "20%",
  },
  label: {
    width: "10%",
  },
  icons: {
    width: "10%",
    display: "flex",
    justifyContent: "space-between",
  },
  isDone: {
    color: "green",
  },
}));

function ListElement(props) {
  const classes = useStyles();
  const auth = useContext(AuthContext);

  const { todoName, date, isDone, label, id } = props.listItem;

  const { setCount, setAlert } = props;
  const [loadedEditTodo, setLoadedEditTodo] = useState("");
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const todoDate = moment(date).format("LLL");
  const todoDateRelative = moment(date).startOf("hour").fromNow(); //new Date(date).toDateString()
  const handleClose = () => {
    setOpen(false);
  };

  const checkHandler = async () => {
    if (!isDone) {
      try {
        await axios.patch(
          `http://localhost:5000/todo/${id}`,
          { isDone: true },
          { headers: { Authorization: `Bearer ${auth.token}` } }
        );
        setCount((prev) => prev + 1);
      } catch (error) {}
    } else {
      try {
        await axios.patch(
          `http://localhost:5000/todo/${id}`,
          { isDone: false },
          { headers: { Authorization: `Bearer ${auth.token}` } }
        );
        setCount((prev) => prev + 1);
      } catch (error) {}
    }
  };

  const editHandler = async (e) => {
    setOpen(true);
    const response = await axios.get(`http://localhost:5000/todo/${id}`);
    setLoadedEditTodo(response.data.todo);
  };

  return (
    <>
      <ListItem className={classes.listItem} id={id}>
        <ListItemText primary={label} className={classes.label} />
        <ListItemText primary={todoName} className={classes.todoName} />
        <ListItemText
          primary={todoDate}
          secondary={`${todoDateRelative}`}
          className={classes.date}
        />
        <Box className={classes.icons}>
          <CheckCircleOutlineIcon
            style={{ cursor: "pointer" }}
            onClick={checkHandler}
            className={isDone && classes.isDone}
          />
          <EditIcon onClick={editHandler} style={{ cursor: "pointer" }} />
          <DeleteIcon
            open={open}
            setCount={setCount}
            onClick={() => setOpenDeleteDialog(true)}
            style={{ cursor: "pointer" }}
          />
        </Box>
        {loadedEditTodo && (
          <EditTodo
            id={id}
            open={open}
            loadedEditTodo={loadedEditTodo}
            onClick={editHandler}
            handleClose={handleClose}
            setCount={setCount}
            setAlert={setAlert}
          />
        )}
        {openDeleteDialog && (
          <DeleteConfirmation
            id={id}
            openDeleteDialog={openDeleteDialog}
            setOpenDeleteDialog={setOpenDeleteDialog}
            setCount={setCount}
            setAlert={setAlert}
          />
        )}
      </ListItem>
    </>
  );
}

export default ListElement;
