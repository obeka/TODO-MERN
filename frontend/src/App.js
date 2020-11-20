import { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Auth from "./pages/Auth";
import Todos from "./pages/Todos";
import { useAuth } from "./hook/auth-hook";
import { AuthContext } from "./context/auth-context";

import "./App.css";
function App() {
  const auth = useContext(AuthContext);
  const { token, userId, userName, login, logout } = useAuth();

  //console.log(localStorage.getItem("todoUserData"));
  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Todos />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Route path="/auth/:userId/:token/:username" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!auth.token,
          token: token,
          userName: userName,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <Router>{routes}</Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
