import React, { Component } from "react";
import { withRouter } from 'react-router';
import { view } from 'react-easy-state';
import { Link } from "react-router-dom"
import Header from "../presentational/Header";
import doorStore from "../../store/doorStore";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    doorStore.goBack = false;
  }

  render() {
    
    return (
      <div className="mainWindow">
        <Header title="Home" noButton={true} />
        <div className="mainContent">
          <Link to="/build" className="navLink" > Build Calculator </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(view(Home));
