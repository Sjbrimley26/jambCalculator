import React, { Component } from "react";
import { withRouter } from "react-router";
import _ from  "lodash";

import Header from "../presentational/Header";
import Description from "../presentational/Description";
import RadioInputSelect from "./RadioInputSelect";
import TextInputSelect from "./TextInputSelect";
import ForwardArrow from "../presentational/ForwardArrow";
import ResetButton from "../presentational/ResetButton";

import doorStore from "../../store/doorStore";
import { view } from "react-easy-state";

class Builder extends Component {
  constructor(props){
    super(props);

    this.selectOption = this.selectOption.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.verifyBoreAndHingeProps = this.verifyBoreAndHingeProps.bind(this);
    this.resetDoor = this.resetDoor.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goHome = this.goHome.bind(this);

    this.state = {
      selected_value: undefined,
      currentProp: doorStore.requiredProps[doorStore.propIndex]
    };
  }

  verifyBoreAndHingeProps() {
    const { selected_value } = this.state;
    const keys = Object.keys(selected_value)
    if ( typeof selected_value === "object" ) {
      if ( keys.includes("Hinge 1") ) {
        if (
          !selected_value[keys[0]] ||
          !selected_value[keys[1]] ||
          !selected_value[keys[2]]
        ) {
          return false;
        }
      }
      if ( keys.includes("Bore 1") ) {
        if (
          !selected_value[keys[0]]
        ) {
          return false;
        }
      }
    }
    return true;
  }

  selectOption() {
    if ( this.state.selected_value && this.verifyBoreAndHingeProps() ) {
      
      doorStore.setDoorProperty(this.state.currentProp)(this.state.selected_value);

      if ( doorStore.incrementPropIndex() ) {
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
    if ( event.target ) { // radio inputs
      this.setState({
        selected_value: event.target.value
      });
    } else { // text inputs, sets a whole object instead of a string
      this.setState({
        selected_value: event
      })
    }
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

    const isTextInput = ["hinge_locations", "bore_locations"]
      .includes(this.state.currentProp);

    return (
      <div className="mainWindow">

        <Header 
          title={ this.state.currentProp }
          handler={ this.state.currentProp === "build" ? this.goHome : this.goBack }
        />

        <div className="mainContent">

          < Description option={this.state.currentProp} />

          {
            isTextInput ?
                < TextInputSelect
                  handleInputChange={this.handleInputChange}
                  option={this.state.currentProp}
                  selected_value={this.state.selected_value}
                /> :
                < RadioInputSelect 
                  handleInputChange={this.handleInputChange}
                  option={this.state.currentProp}
                  selected_value={this.state.selected_value}
                />
          }

          < ResetButton
            handler={this.resetDoor}
          />

          < ForwardArrow
            handler = { this.selectOption }
          />

        </div>
      </div>
    );
  }
}

export default withRouter(view(Builder));