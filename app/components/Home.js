import React, { Component } from "react";
import { withRouter } from 'react-router';
import { view } from 'react-easy-state';
import { Link } from "react-router-dom"
import Header from "./Header";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { time } = this.props;
    
    return (
      <div className="mainWindow">
        <Header title="Home" />
        <div className="mainContent">
          <Link to="/location" className="navLink" > Build Calculator </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(view(Home));
