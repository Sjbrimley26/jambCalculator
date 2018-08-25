import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import { ConfirmDoor } from "../components/presentational";

import {
  Home,
  Builder,
  LoginPage,
  UserPage,
  AddUser,
  ChangePassword
} from "../components/container";

import { view } from "react-easy-state";
import doorStore from "../store/doorStore";

const syncStorage = () => {
  localStorage.setItem("storedDoor", JSON.stringify(doorStore.currentDoor));
  localStorage.setItem("propIndex", doorStore.propIndex);
  localStorage.setItem("requiredProps", JSON.stringify(doorStore.requiredProps));
};

const verifyToken = () => {
  return localStorage.getItem("token") ? true : false;
};

const RouteCreate = (props) => {
  return (
    (props.onEnter !== undefined ?
      (props.onEnter() ?
        <Route { ...props} /> :
        <Redirect to="/login" />
      ) :
      <Route { ...props} />
    )
  );
};

class AppRouter extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    window.addEventListener("beforeunload", syncStorage);
  }

  componentWillUnmount(){
    window.removeEventListener("beforeunload", syncStorage);

    syncStorage();
  }

  render() {

    return (
      <HashRouter>        
        <div className="fullscreen">
          <Switch>
            <RouteCreate path="/" exact onEnter={verifyToken} render={ props => <Home {...props} /> } />
            <RouteCreate path="/build" exact onEnter={verifyToken} render={ props => <Builder {...props} /> } />
            <RouteCreate path="/confirmDoor" exact onEnter={verifyToken} render={ props => <ConfirmDoor {...props} door={doorStore.currentDoor} /> } />
            <RouteCreate path="/login" exact render={ props => <LoginPage {...props} /> } />
            <RouteCreate path="/profile" render={ props => <UserPage {...props}/> } />
            <RouteCreate path="/addUser" onEnter={verifyToken} component={ AddUser } />
            <RouteCreate path="/changePassword" onEnter={verifyToken} component={ ChangePassword } />
          </Switch>
          <div className="footer">
            <a href="https://icons8.com">Icon pack by Icons8</a>
          </div>
        </div>
      </HashRouter>
    );
  }
};

export default view(AppRouter);
