import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Home from "../components/container/Home";
import Builder from "../components/container/Builder";
import { view } from "react-easy-state";
import doorStore from "../store/doorStore";

const AppRouter = () => {

  return (
    <HashRouter>
      <div className="fullscreen">
        <Switch>
          <Route path="/" exact render={ props => <Home {...props} /> } />
          <Route path="/build" exact render={ props => <Builder {...props} question="build" />} />
        </Switch>
        <div className="footer">
          <a href="https://icons8.com">Icon pack by Icons8</a>
        </div>
      </div>
    </HashRouter>
  );
};

export default view(AppRouter);
