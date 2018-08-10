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
            <div className="confirmationDetails">
              {
                Object.entries(this.props.door).map((item, i) => {
                  const [ prop, val ] = item;
                  const valIsObject = typeof val === "object";
                  if (valIsObject) {
                    return (
                      <div key={i} className="detailLine" >
                        { 
                          `${titleCase(prop)}: ` + 
                          `${Object.keys(val).map(key => {
                            if (val[key]) {
                              return (
                                ` ${key}: ${val[key]}\"`
                              );
                            }
                            return null;
                          })}` 
                        }
                      </div>
                    );
                  } else {
                    return (
                      <div key={i} className="detailLine" >
                        { `${titleCase(prop)}: ${val}` }
                      </div>
                    );
                  }
                })
              }
            </div>
          </div>
        </div>
    );
  }
};

export default ConfirmDoor;