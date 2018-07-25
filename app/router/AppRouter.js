import React from "react";
import { HashRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import Home from "../components/Home";
import { view } from "react-easy-state";

const AppRouter = () => {

  return (
    <HashRouter>
      <div className="fullscreen">
        <Switch>
          <Route path="/" exact render={ props => <Home {...props} /> } />
        </Switch>
      </div>
    </HashRouter>
  );
};

export default view(AppRouter);
