import React, { Component } from "react";
import { view } from "react-easy-state";
import BackButton from "./BackButton";

class Header extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const { title } = this.props;
    return (
      <div className="header">
        { title === "Home" ? null : <BackButton/> }
        <span className="title"> { title } </span>
      </div>
    );
  }
}

export default view(Header);