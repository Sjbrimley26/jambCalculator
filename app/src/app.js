import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "../router/AppRouter";
import "../assets/styles/global.scss";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<AppRouter/>, document.getElementById("app"));
registerServiceWorker();
