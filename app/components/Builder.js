import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Header from "./Header";
import doorStore from "../store/doorStore";

class Builder extends Component {
  constructor(props){
    super(props);

    this.state = {
      description: ""
    };
  }

  componentDidMount() {
    this.setDescription();
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

  render() {
    return (
      <div className="mainWindow">
        <Header title="Location"/>
        <div className="mainContent">
          <span className="description">{ this.state.description }</span>
        </div>
      </div>
    );
  }
}

export default withRouter(Builder);