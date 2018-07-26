import React, { Component } from "react";
import { withRouter } from 'react-router';
import { view } from 'react-easy-state';
import doorStore from "../store/doorStore";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  navTo = (url) => {
    return this.props.history.push(url);
  }

  render() {
    let { currentTime } = doorStore;
    
    return (
      <div>
        Home!
        <br/>
        { currentTime.toLocaleDateString() }
        <br/>
        { currentTime.toLocaleTimeString() }
      </div>
    );
  }
}

export default withRouter(view(Home));
