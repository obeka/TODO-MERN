import { lighten, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  //Auth Page
  authContainer: {
    height: "100vh",
  },
  backgroundImage: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  authPaper: {
    margin: theme.spacing(8, 2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  lock: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  authForm: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  authSubmit: {
    margin: theme.spacing(3, 0, 2),
  },

  //Header
  header: {
    display: "flex",
    justifyContent: "space-evenly",
    backgroundColor: "#839b97"
  },
  /* headerContainer: {

  } */

  //Banner
  banner: {
    padding: 40,
    backgroundColor: "lightgrey",
  },

  //AddTodo and Edit Todo Components
  formControl: {
    margin: theme.spacing(1),
    minWidth: 420,
    paddingLeft: 20,
    paddingRight: 20,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  boxContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20,
  },
  box: {
    width: "45%",
  },

  //Alert
  alertContainer: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },

  //SearchBox
  searchBoxContainer: {
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(5),
    },
    margin: "20px auto"
  },

  //TodoTable
  todoContainer: {
    width: "100%",
  },
  todoPaper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },

  //ToolBar
  toolBarContainer: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  toolBarTitle: {
    flex: "1 1 100%",
  },
}));

export default useStyles;
