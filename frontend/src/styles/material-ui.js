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
    backgroundColor: "#206a5d",
  },
  authForm: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  authSubmit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#206a5d",
  },
  socialIcon: {
    margin: theme.spacing(3, 0, 2), 
    backgroundColor: "#206a5d",
    width: 30,
    marginRight:10
  },
  footer: {
    position: "absolute",
    bottom: 20
  },

  //Header
  header: {
    display: "flex",
    justifyContent: "space-evenly",
    backgroundColor: "#f4f4f4",
    paddingTop: 20,
    paddingBottom: 20,
  },
  logo: {
    width: 60,
  },
  headerText: {
    color: "#335d2d",
    fontSize: "30px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  },
  headerIcon: {
    fontSize: "30px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "20px",
    },
  },

  //Banner
  banner: {
    padding: 15,
    backgroundColor: "#206a5d",
    color: "#eff48e",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  bannerButton: {
    [theme.breakpoints.down("xs")]: {
      margin: 10,
    },
  },
  bannerIcon: {
    marginLeft: 5,
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
    color: "yellow",
  },
  box: {
    width: "45%",
  },

  buttons: {
    color: "#206a5d",
  },

  buttonss : {
    backgroundColor: "#206a5d"
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
    margin: "0 auto 30px",
    [theme.breakpoints.down("xs")]: {
      width: 340,
    },
  },

  //Table
  tableContainer: {
    width: "90%",
    margin: "10px auto",
    paddingTop: 20,
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
          //color: theme.palette.secondary.main,
          color: "#206a5d",
          backgroundColor: lighten("#206a5d", 0.85),
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
