import React, { Component } from "react";
import { view } from "react-easy-state";
import BackButton from "./BackButton";
import { titleCase } from "../../misc";

class Header extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const { title, handler, noButton } = this.props;
    return (
      <div className="header">
        { noButton ? null : <BackButton handler={handler} /> }
        <span className="title"> { titleCase(title) } </span>
      </div>
    );
  }
}

export default view(Header);