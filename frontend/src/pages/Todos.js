import React, { useState, useContext, useEffect } from "react";
//import { makeStyles } from "@material-ui/core/styles";

import Header from "../components/Header";
import Banner from "../components/Banner";
import { AuthContext } from "../context/auth-context";
import axios from "axios";
import Alert from "../components/Alert";
import TodoTable from "../components/TodoTable";
import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "../styles/material-ui";

function Todos() {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [userTodos, setUserTodos] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    hasAlert: false,
    alertMsg: {},
    severity: "",
  });

  useEffect(() => {
    const fetchUserTodo = async () => {
      try {
        setIsLoading(true);
        const responseData = await axios.get(
          `http://localhost:5000/todo/user/${auth.userId}`
        );
        setUserTodos(responseData.data.todo);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchUserTodo();
  }, [auth.userId, count]);
  return (
    <>
      {alert.hasAlert && <Alert alert={alert} setAlert={setAlert} />}
      <Header />
      <Banner setCount={setCount} />
      <div className={classes.tableContainer}>
        {userTodos.length === 0 && (
          <Typography style={{ marginBottom: 20 }} variant="h6" component="h6">
            You don't have any todos.
          </Typography>
        )}

        {userTodos && (
          <TodoTable
            userTodos={userTodos}
            setCount={setCount}
            setAlert={setAlert}
          />
        )}
      </div>
      {isLoading && (
        <>
          <CircularProgress size={20} className={classes.loading} />
        </>
      )}
    </>
  );
}

export default Todos;
