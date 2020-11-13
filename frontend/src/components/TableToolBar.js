import React, { useState } from "react";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { lighten, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FilterListIcon from "@material-ui/icons/FilterList";
import useStyles from "../styles/material-ui";

import DeleteConfirmation from "./DeleteConfirmation";
import EditTodo from "./EditTodo";

import axios from "axios"

function TableToolBar(props) {
  const classes = useStyles();
  const {
    numSelected,
    todoId,
    setCount,
    selected,
    setAlert,
    setSelected,
    setSelectedTags
  } = props;
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [loadedEditTodo, setLoadedEditTodo] = useState(null)

  TableToolBar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const editHandler = async (e) => {
    setOpen(true);
    const response = await axios.get(`http://localhost:5000/todo/${selected[0]}`);
    setLoadedEditTodo(response.data.todo);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Toolbar
        className={clsx(classes.toolBarContainer, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography
            className={classes.toolBarTitle}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            className={classes.toolBarTitle}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Todo List
          </Typography>
        )}
        {numSelected === 1 ? (
          <>
            <Tooltip title="Edit">
              <IconButton aria-label="edit">
                <EditIcon
                  open={open}
                  setCount={setCount}
                  onClick={editHandler}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton aria-label="delete">
                <DeleteIcon
                  open={open}
                  setCount={setCount}
                  onClick={() => setOpenDeleteDialog(true)}
                />
              </IconButton>
            </Tooltip>
          </>
        ) : numSelected > 1 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon
                open={open}
                setCount={setCount}
                onClick={() => setOpenDeleteDialog(true)}
              />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      {openDeleteDialog && (
        <DeleteConfirmation
          //id={id}
          selected={selected}
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          setCount={setCount}
          setAlert={setAlert}
          setSelected={setSelected}
        />
      )}
      {loadedEditTodo && (
          <EditTodo
            id={selected[0]}
            open={open}
            loadedEditTodo={loadedEditTodo}
            onClick={editHandler}
            handleClose={handleClose}
            setCount={setCount}
            setAlert={setAlert}
          />
        )}
    </>
  );
}

export default TableToolBar;
