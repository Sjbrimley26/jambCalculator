import React, { Component } from "react";
import Header from "./Header";

import { titleCase } from "../../misc/utils";
import { getPrice } from "../../calculator";

class ConfirmDoor extends Component {
  constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.push("build");
  }

  render() {
    let doorPrice = getPrice(this.props.door);
    let goodPrice = typeof doorPrice === "number";
    let taxPrice;
    let totalPrice;
    
    if (goodPrice) {
      taxPrice = (doorPrice * .0805).toFixed(2);
      totalPrice = ((parseFloat(doorPrice) * 100 + parseFloat(taxPrice) * 100)/ 100).toFixed(2);
      doorPrice = doorPrice.toFixed(2);
    }

    return (
      <div className="mainWindow">   
          < Header 
            title="Confirm Build"
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
                  }  

                  else {
                    return (
                      <div key={i} className="detailLine" >
                        { `${titleCase(prop)}: ${val}` }
                      </div>
                    );
                  }
                })
              }

              <div className="detailLine"/>
              <div className="detailLine detailLine--price">
                <span>Subtotal : { goodPrice ? '$' : null }{doorPrice}</span>
              </div>

              {
                goodPrice ?
                <div>
                  <div className="detailLine detailLine--price">
                    <span>Tax : $&ensp;{taxPrice}</span>
                  </div>
                  <div className="detailLine detailLine--price">
                    <span>Total : ${totalPrice}</span>
                  </div>
                </div> :
                null
              }

            </div>
          </div>
        </div>
    );
  }
};

export default ConfirmDoor;