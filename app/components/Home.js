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

  componentDidMount(){
    setInterval(doorStore.updateTime, 1000);
  }

  render() {
    const { currentTime } = doorStore;
    
    return (
      <div>
        Home!
        <br/>
        { currentTime.toLocaleString() }
      </div>
    );
  }
}

export default withRouter(view(Home));
