import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Header from "../presentational/Header";
import Description from "../presentational/Description";
import doorStore from "../../store/doorStore";
import _ from "lodash"

class Builder extends Component {
  constructor(props){
    super(props);

    this.state = {
      description: "",
      selected_value: undefined
    };
  }

  componentDidMount() {
    doorStore.goBack = false;
    // console.log(doorStore.currentDoor);
    // console.log(this.props.history);
  }

  componentWillUnmount() {
    if (doorStore.goBack) {
      doorStore.resetDoorProperty(this.props.question);
    }
  }

  navTo = (url) => {
    return this.props.history.push(url);
  }

  selectOption() {
    doorStore.setDoorProperty(this.props.question)(this.state.selected_value);
  }

  verifyProps() {
    switch(this.props.question) {
      case "build":
        break;
      case "location":
        if ( !doorStore.currentDoor.hasOwnProperty("build"))
    }
  }

  render() {
    return (
      <div className="mainWindow">
        <Header title={_.startCase(_.toLower(this.props.question))}/>
        <div className="mainContent">
          < Description option={this.props.question} /> 
        </div>
      </div>
    );
  }
}

export default withRouter(Builder);