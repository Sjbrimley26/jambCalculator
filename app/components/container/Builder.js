import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Header from "../presentational/Header";
import Description from "../presentational/Description";
import InputSelect from "../presentational/InputSelect";
import doorStore from "../../store/doorStore";
import { titleCase } from "../../misc/utils";

const propStates = [ // Needs to be ordered
  "build",
  "location",
  "material",
  "jamb_width",
  "height",
  "swing",
  "sidelites"
];

let propStateIndex = 0;

class Builder extends Component {
  constructor(props){
    super(props);

    this.selectOption = this.selectOption.bind(this);
    this.selectValue = this.selectValue.bind(this);

    this.state = {
      selected_value: undefined,
      currentProp: propStates[propStateIndex]
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
    doorStore.setDoorProperty(this.state.currentProp)(this.state.selected_value);
    propStateIndex++;
    this.setState({
      currentProp: propStates[propStateIndex]
    });
  }

  selectValue( event ) {
    this.setState({
      selected_value: event.target.value
    });
  }

  render() {

    return (
      <div className="mainWindow">
        <Header title={ titleCase(this.state.currentProp) }/>
        <div className="mainContent">
          < Description option={this.state.currentProp} />
          < InputSelect 
            selectOption={this.selectOption} 
            selectValue={this.selectValue}
            option={this.state.currentProp}
            selected_value={this.state.selected_value}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Builder);