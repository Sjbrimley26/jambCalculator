import React, { Component } from "react";
import { withRouter } from "react-router";
import back from "../../assets/images/icons8/back.png";
import doorStore from "../../store/doorStore";

class BackButton extends Component {
  constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    doorStore.goBack = true;
    return this.props.history.goBack();
  }

  render() {
    return (
      <div 
        className="backButton"
        style={{ backgroundImage: `url(${back})` }}
        onClick={this.goBack}
      >
      </div>
    );
  }
}

export default withRouter(BackButton);