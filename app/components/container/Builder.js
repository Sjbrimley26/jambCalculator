import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Header from "../presentational/Header";
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
    console.log(doorStore.currentDoor);
    this.setDescription();
  }

  componentWillUnmount() {
    if (doorStore.goBack) {
      doorStore.resetDoorProperty(this.props.question);
    }
  }

  navTo = (url) => {
    return this.props.history.push(url);
  }

  setDescription(){
    switch( this.props.question ) {
      case "location":
        return this.setState({
          description: "Please select the location of the door."
        });

      case "build":
        return this.setState({
          description: "Please select a build option for the door."
        });

      case "material":
        return this.setState({
          description: "Please select a jamb material."
        });
      
      case "jamb_width":
        return this.setState({
          description: "Please select a jamb width."
        });
      
      case "height":
        return this.setState({
          description: "Please select the height of the door."
        });
      
      case "swing":
        return this.setState({
          description: "Please select the desired door swing direction."
        });
      
      case "sidelites":
        return this.setState({
          description: "Please select the number of sidelites."
        });
    }
  }

  selectOption() {
    doorStore.setDoorProperty(this.props.question)(this.state.selected_value);
  }

  render() {
    return (
      <div className="mainWindow">
        <Header title={_.startCase(_.toLower(this.props.question))}/>
        <div className="mainContent">
          <span className="description">{ this.state.description }</span>
        </div>
      </div>
    );
  }
}

export default withRouter(Builder);