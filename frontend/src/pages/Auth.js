import React, { useState, useContext, useEffect } from "react";

import { useParams } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "../styles/material-ui";
import useForm from "../hook/form-hook";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Alert from "../components/Alert";
import { AuthContext } from "../context/auth-context";

import Icon from "@mdi/react";
import { mdiGooglePlus } from "@mdi/js";
import { mdiGithub } from "@mdi/js";

export default function Auth() {
  const classes = useStyles();
  const history = useHistory();
  const { userId, token, username } = useParams();
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    hasAlert: false,
    alertMsg: {},
    severity: "",
  });
  const { formState, inputHandler } = useForm({
    password: "",
    email: "",
  });

  useEffect(() => {
    if (token) {
      auth.userId = userId;
      auth.token = token;
      auth.username = username;
      auth.login(token, userId, username);
      history.push("/");
    }
  });

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isLoginMode) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/user/login`,
          formState
        );
        if (response.status === 200) {
          auth.userId = response.data.userId;
          auth.token = response.data.token;
          auth.isLoggedIn = true;
          auth.userName = response.data.username;
          auth.login(auth.token, auth.userId, auth.userName);
          setIsLoading(false);
          history.push("/");
        } else {
          setIsLoading(false);
          history.push("/auth");
        }
      } catch (error) {
        setIsLoading(false);
        setAlert({
          hasAlert: true,
          alertMsg: error.response.data,
          severity: "error",
        });
      }
    } else {
      try {
        setIsLoading(true);
        if (formState.password !== formState.password2) {
          //alert("Passwords must be matched.");
          setAlert({
            hasAlert: true,
            alertMsg: "Passwords must be matched.",
            severity: "error",
          });
          setIsLoading(false);
          return;
        }
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/user/signup`,
          formState
        );
        if (response.status === 201) {
          auth.userId = response.data.userId;
          auth.token = response.data.token;
          auth.isLoggedIn = true;
          auth.login(auth.isLoggedIn);
          setIsLoading(false);
          history.push("/");
        } else {
          setIsLoading(false);
          history.push("/auth");
        }
      } catch (error) {
        setIsLoading(false);
        setAlert({
          hasAlert: true,
          alertMsg: error.response.data,
          severity: "error",
        });
      }
    }
  };

  return (
    <Grid container component="main" className={classes.authContainer}>
      <CssBaseline />
      <Grid item xs={false} sm={6} md={7} className={classes.backgroundImage}>
        <div className="auth-text">
          {" "}
          <img
            src="https://i.postimg.cc/TPLwgVQj/todoLogo.png"
            alt="logo"
            className={classes.logo}
          />
          TODO VAULT
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
        <div className={classes.authPaper}>
          {isLoading && (
            <>
              <CircularProgress size={20} className={classes.loading} />
            </>
          )}
          <Avatar className={classes.lock}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isLoginMode ? "Sign in" : "Sign up"}
          </Typography>
          <form
            className={classes.authForm}
            noValidate
            onSubmit={submitHandler}
          >
            {alert.hasAlert && <Alert alert={alert} setAlert={setAlert} />}
            {!isLoginMode && (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="User name"
                name="username"
                onChange={inputHandler}
                autoFocus
              />
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={inputHandler}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={inputHandler}
            />
            {!isLoginMode && (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password2"
                label="Rewrite password again"
                type="password"
                id="password2"
                autoComplete="current-password"
                onChange={inputHandler}
              />
            )}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            {isLoginMode ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.authSubmit}
                disabled={!(formState.email && formState.password)}
              >
                <span style={{ color: "white" }}>SIGN IN</span>
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.authSubmit}
                disabled={
                  !(
                    formState.email &&
                    formState.password &&
                    formState.username &&
                    formState.password2
                  )
                }
              >
                <span style={{ color: "white" }}>SIGN UP</span>
              </Button>
            )}

            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={switchModeHandler}>
                  {isLoginMode
                    ? "Don't have an account? Sign Up"
                    : "Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
            <Box>
              <Button
                href={`${process.env.REACT_APP_BACKEND_URL}/user/google`}
                variant="contained"
                className={classes.socialIcon}
              >
                <Icon
                  path={mdiGooglePlus}
                  title="Google Plus+"
                  size={1}
                  color="white"
                />
              </Button>
              <Button
                href={`${process.env.REACT_APP_BACKEND_URL}/user/github`}
                variant="contained"
                className={classes.socialIcon}
              >
                <Icon
                  path={mdiGithub}
                  title="Google Plus+"
                  size={1}
                  color="white"
                />
              </Button>
            </Box>
          </form>
          <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
              {"Copyright © "}
              
                TV2Z
              
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}
