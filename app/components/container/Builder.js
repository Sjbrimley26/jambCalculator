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

  componentDidMount() {
    doorStore.goBack = false;
    // console.log(doorStore.currentDoor);
    // console.log(this.props.history);
  }

  componentWillUnmount() {
    if (doorStore.goBack) {
      doorStore.resetDoorProperty(this.state.currentProp);
    }
  }

  navTo = (url) => {
    return this.props.history.push(url);
  }

  selectOption() {
    if ( this.state.selected_value ) {

      let { propStates } = doorStore;
      doorStore.setDoorProperty(this.state.currentProp)(this.state.selected_value);

      if ( this.currentProp === "sidelites" || ( doorStore.currentDoor.location === "Interior" && this.currentProp === "swing") ) {
        
        // go to confirmation page

      } else {

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