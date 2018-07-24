import React from "react";
import { HashRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import Home from "../components/Home";
import { view } from "react-easy-state";
import doorStore from "../store/doorStore";

const AppRouter = () => {

  return (
    <HashRouter>
      <div className="fullscreen">
        <Switch>
          <Route path="/" exact render={props => <Home {...props} store={doorStore} />} />
        </Switch>
      </div>
    </HashRouter>
  );
};

export default view(AppRouter);
