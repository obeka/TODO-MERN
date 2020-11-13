import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import useStyles from "../styles/material-ui";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AlertBox(props) {
  const classes = useStyles();
  const { alert, setAlert } = props;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...alert, hasAlert: false });
  };
  return (
    <>
      <div className={classes.alertContainer}>
        <Snackbar
          open={alert.hasAlert}
          autoHideDuration={4000} /* onClose={handleClose} */
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={alert.severity}>
            {alert.alertMsg}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}

export default AlertBox;
