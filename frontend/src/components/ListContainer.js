import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";

import ListElement from "./ListElement";
import TodoTable from "../components/TodoTable";

const useStyles = makeStyles((theme) => ({
  listContainer: {
    width: "100%",
    margin: "20px auto",
    maxWidth: 1200,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ListContainer(props) {
  const classes = useStyles();
  const { userTodos, setCount, setAlert } = props;

  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      alignItems="center"
      className={classes.listContainer}
    >
      {userTodos.length === 0 && (
        <Box fontSize={30} m={5}>
          You have no todo.
        </Box>
      )}

       

      <List className={classes.listContainer}>
        {userTodos.map((listItem, index) => (
          <ListElement
            listItem={listItem}
            key={index}
            setCount={setCount}
            alert={alert}
            setAlert={setAlert}
          />
        ))}
      </List>
    </Grid>
  );
}
