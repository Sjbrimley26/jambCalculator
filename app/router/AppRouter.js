import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Home from "../components/container/Home";
import Builder from "../components/container/Builder";
import ConfirmDoor from "../components/presentational/ConfirmDoor";

import { view } from "react-easy-state";
import doorStore from "../store/doorStore";

const storeDoor = () => {
  localStorage.setItem("storedDoor", JSON.stringify(doorStore.currentDoor));
  localStorage.setItem("propIndex", doorStore.propIndex);
};

class AppRouter extends Component {

  componentDidMount(){
    window.addEventListener("beforeunload", storeDoor);
  }

  componentWillUnmount(){
    window.removeEventListener("beforeunload", storeDoor);

    storeDoor();
  }

  render() {
    return (
      <HashRouter>
        <div className="fullscreen">
          <Switch>
            <Route path="/" exact render={ props => <Home {...props} /> } />
            <Route path="/build" exact render={ props => <Builder {...props} /> } />
            <Route path="/confirmDoor" exact render={ props => <ConfirmDoor {...props} door={doorStore.currentDoor} /> } />
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
