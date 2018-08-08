import React, { Component } from "react";
import { withRouter } from "react-router";
import back from "../../assets/images/icons8/back.png";
import { view } from "react-easy-state";

class BackButton extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div 
        className="backButton"
        style={{ backgroundImage: `url(${back})` }}
        onClick={this.props.handler}
      >
      </div>
    );
  }
}

export default withRouter(view(BackButton));