import React, { Component } from "react";
import { withRouter } from "react-router";

import Header from "../presentational/Header";
import Description from "../presentational/Description";
import InputSelect from "../presentational/InputSelect";
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

    const { propStates } = doorStore;

    this.state = {
      selected_value: undefined,
      currentProp: propStates[doorStore.propIndex]
    };
  }

  navTo = (url) => {
    return this.props.history.push(url);
  }

  selectOption() { // I should clean up this function
    if ( this.state.selected_value ) {

      let { propStates } = doorStore;
      doorStore.setDoorProperty(this.state.currentProp)(this.state.selected_value);

      // Upon selecting the last option...
      if ( 
        this.state.currentProp === "sidelites" ||
        (doorStore.currentDoor.location === "Interior" && this.state.currentProp === "height") 
      ) {
        // Redirect to door confirmation
        // But I should redirect to an additional details page
        // Or I could just add more build options and be more careful about the indices and stuff
        this.props.history.push("confirmDoor")
      } else {

        // skip a few indices so we don't gather irrelevant details
        if ( doorStore.currentDoor.build === "Bore and Dap" && this.state.currentProp === "location" ) {
          doorStore.incrementPropIndex();
          doorStore.incrementPropIndex();
        }
  
        doorStore.incrementPropIndex();
        this.setState({
          currentProp: propStates[doorStore.propIndex],
          selected_value: undefined
        });

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

  resetDoor(){
    doorStore.resetCurrentDoor();
    this.setState({
      currentProp: "build"
    });
  }

  goBack(){
    const { propStates } = doorStore;
    doorStore.resetDoorProperty(this.currentProp);
    doorStore.decrementPropIndex();
    this.setState({
      currentProp: propStates[doorStore.propIndex],
      selected_value: undefined
    });
  }

  goHome() {
    this.resetDoor();
    this.props.history.push("/");
  }

  render() {

    // console.log("RENDER", doorStore.currentDoor);
    // console.log(doorStore.currentDoor);

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