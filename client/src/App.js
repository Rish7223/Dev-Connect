import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { authUser } from "./action/auth";
import PrivateRoute from "./utility/PrivateRoute";
import Navbar from "./components/utils/Navbar";
import Landing from "./components/Landing";
import setAuthToken from "./utility/setAuthToken";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./components/home/Home";
import Post from "./components/post/Post";
import Createpost from "./components/post/Createpost";
import Editpost from "./components/post/Editpost";
import Notfound from "./components/utils/Notfound";

// redux
import { Provider } from "react-redux";
import store from "./store";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(authUser());
  }, []);
  return (
    <Provider store={store}>
      <Fragment>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path="/" component={Landing} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/login" component={Login} exact />
            <PrivateRoute path="/home" component={Home} exact />
            <PrivateRoute path="/post/:id" component={Post} exact />
            <PrivateRoute path="/createpost" component={Createpost} exact />
            <PrivateRoute path="/editpost/:id" component={Editpost} exact />
            <Route component={Notfound} />
          </Switch>
        </BrowserRouter>
      </Fragment>
    </Provider>
  );
};

export default App;
