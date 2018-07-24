import React, { Component } from "react";
import { withRouter } from 'react-router';
import { view } from 'react-easy-state';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  navTo = (url) => {
    return this.props.history.push(url);
  }

  componentDidMount() {
    setInterval(this.props.store.updateTime, 1000);
  }

  render() {
    return (
      <div>
        Home!
        { this.props.store.currentTime.toString() }
      </div>
    );
  }
}

export default withRouter(view(Home));
