import React, { Component } from "react";
import Header from "./Header";

import { titleCase } from "../../misc";
import { getPrice } from "../../calculator";
import { userStore } from "../../store";

class ConfirmDoor extends Component {
  constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      discount: 0
    };
  }

  goBack() {
    this.props.history.push("build");
  }

  discountChange = (e) => {
    this.setState({
      discount: e.target.value
    });
  }

  render() {
    const priceRange = userStore.currentUser.priceRange;
    let doorPrice = getPrice(this.props.door) * ((100 - this.state.discount) / 100);
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

              {
                priceRange ?
                <div className="detailLine">
                  <label htmlFor="discount">Discount</label>
                  &nbsp;&nbsp;
                  <input 
                    type="range" 
                    name="discount" 
                    min="0" 
                    max={priceRange} 
                    step="1"
                    value={this.state.discount}
                    onChange={this.discountChange}
                  />
                  &nbsp;&nbsp;
                  { this.state.discount }%
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