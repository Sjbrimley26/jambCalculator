import React, { Component } from "react";
import { view } from "react-easy-state";
import BackButton from "./BackButton";
import { titleCase } from "../../misc/utils";

class Header extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const { title, handler } = this.props;
    return (
      <div className="header">
        { title === "Home" ? null : <BackButton handler={handler} /> }
        <span className="title"> { titleCase(title) } </span>
      </div>
    );
  }
}

export default view(Header);