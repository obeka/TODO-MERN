import React, { useState, useContext, useEffect } from "react";
//import { makeStyles } from "@material-ui/core/styles";

import Header from "../components/Header";
import Banner from "../components/Banner";
import ListContainer from "../components/ListContainer";
import { AuthContext } from "../context/auth-context";
import axios from "axios";
import Alert from "../components/Alert";
import TodoTable from "../components/TodoTable";
import useStyles from "../styles/material-ui";

function Todos() {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [userTodos, setUserTodos] = useState([]);
  const [count, setCount] = useState(0);
  const [alert, setAlert] = useState({
    hasAlert: false,
    alertMsg: {},
    severity: "",
  });

  useEffect(() => {
    const fetchUserTodo = async () => {
      console.log("Fetching user todos...");
      try {
        const responseData = await axios.get(
          `http://localhost:5000/todo/user/${auth.userId}`
        );
        setUserTodos(responseData.data.todo);
      } catch (err) {}
    };
    fetchUserTodo();
  }, [auth.userId, count]);
  return (
    <>
      {alert.hasAlert && <Alert alert={alert} setAlert={setAlert} />}
      <Header />
      <Banner setCount={setCount} />
      <div className={classes.tableContainer}>
        {userTodos && (
          <TodoTable
            userTodos={userTodos}
            setCount={setCount}
            setAlert={setAlert}
          />
        )}
      </div>
      {/*  <ListContainer userTodos={userTodos} setCount={setCount} setAlert={setAlert}/>  */}
    </>
  );
}

export default Todos;
