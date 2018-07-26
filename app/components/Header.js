import React, { Component } from "react";
import { view } from "react-easy-state";

class Header extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const { title } = this.props;
    return (
      <div className="header">
        <span className="title"> { title } </span>
      </div>
    );
  }
}

export default view(Header);