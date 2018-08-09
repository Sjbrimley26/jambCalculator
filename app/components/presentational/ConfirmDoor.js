import React, { Component } from "react";
import Header from "./Header";

import { titleCase } from "../../misc/utils";

class ConfirmDoor extends Component {
  constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.push("build");
  }

  render() {
    return (
      <div className="mainWindow">
          < Header 
            title="Confirm Door"
            handler={this.goBack}
          />
          <div className="mainContent">
            {
              Object.entries(this.props.door).map((item, i) => {
                const [ prop, val ] = item;
                if ( prop === 'complete' ) return null;
                return (
                  <div key={i}>
                    { `${titleCase(prop)}: ${val}` }
                  </div>
                )
              })
            }
          </div>
        </div>
    );
  }
};

export default ConfirmDoor;