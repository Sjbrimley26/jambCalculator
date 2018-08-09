import React, { Component } from "react";
import { withRouter } from "react-router";

import Header from "../presentational/Header";
import Description from "../presentational/Description";
import InputSelect from "../container/InputSelect";
import ForwardArrow from "../presentational/ForwardArrow";
import ResetButton from "../presentational/ResetButton";

import doorStore from "../../store/doorStore";
import { view } from "react-easy-state";

class Builder extends Component {
  constructor(props){
    super(props);

    this.selectOption = this.selectOption.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.resetDoor = this.resetDoor.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goHome = this.goHome.bind(this);

    this.state = {
      selected_value: undefined,
      currentProp: doorStore.requiredProps[doorStore.propIndex]
    };
  }

  selectOption() {
    if ( this.state.selected_value ) {
      
      doorStore.setDoorProperty(this.state.currentProp)(this.state.selected_value);

      if ( doorStore.incrementPropIndex() && !doorStore.checkIfDoorComplete() ) {
        this.setState({
          currentProp: doorStore.requiredProps[doorStore.propIndex],
          selected_value: undefined
        });
      } else {
        this.props.history.push("confirmDoor");
      }

    } else {
      alert("Please select an option");
    }
  }

  handleInputChange( event ) {
    this.setState({
      selected_value: event.target.value
    });
  }

  resetDoor() {
    doorStore.resetCurrentDoor();
    this.setState({
      currentProp: "build"
    });
  }

  goBack() {
    doorStore.resetDoorProperty(this.currentProp);
    doorStore.decrementPropIndex();
    this.setState({
      currentProp: doorStore.requiredProps[doorStore.propIndex],
      selected_value: undefined
    });
  }

  goHome() {
    this.resetDoor();
    this.props.history.push("/");
  }

  render() {

    return (
      <div className="mainWindow">
        <Header 
          title={ this.state.currentProp }
          handler={ this.state.currentProp === "build" ? this.goHome : this.goBack }
          />
        <div className="mainContent">

          < Description option={this.state.currentProp} />

          < InputSelect 
            selectOption={this.selectOption} 
            handleInputChange={this.handleInputChange}
            option={this.state.currentProp}
            selected_value={this.state.selected_value}
          />

          < ResetButton
            handler={this.resetDoor}
          />

          < ForwardArrow
            handler={this.selectOption}
          />

        </div>
      </div>
    );
  }
}

export default withRouter(view(Builder));