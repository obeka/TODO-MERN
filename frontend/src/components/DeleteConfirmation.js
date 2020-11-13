import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "axios";
import { AuthContext } from "../context/auth-context";

function DeleteConfirmation(props) {
  const {
    openDeleteDialog,
    setOpenDeleteDialog,
    setCount,
    setAlert,
    selected,
    setSelected
  } = props;
  
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const deleteManyHandler = async (e) => {
    try {
      setIsLoading(true);
      const responseData = await axios.delete(
        `http://localhost:5000/todo/many`,
        { headers: { Authorization: `Bearer ${auth.token}` }, data: {selected, userId: auth.userId} }
      );
      console.log(responseData);
      setCount((prev) => prev + 1);
      setIsLoading(false);
      setAlert({
        hasAlert: true,
        alertMsg: "Success: Todo deleted!",
        severity: "success",
      });
      setSelected([])
      handleClose();
    } catch (error) {
      console.log(error.message);
      setAlert({
        hasAlert: true,
        alertMsg: "Failure: Todo can not be deleted!",
        severity: "warning",
      });
    }
  };

  const handleClose = () => {
    setOpenDeleteDialog(false);
  };
  return (
    <div>
      <Dialog
        open={openDeleteDialog}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this todo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteManyHandler} color="primary">
            Delete{" "}
            {isLoading && (
              <>
                <span>ing </span>
                <CircularProgress size={20} color="secondary" />
              </>
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteConfirmation;
