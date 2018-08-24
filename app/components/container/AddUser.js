import React from "react";
import { Header } from "../presentational";
import { view } from "react-easy-state";
import { userStore } from "../../store";
import { withRouter } from "react-router";
import { titleCase } from "../../misc";
import set from "lodash/set";
import { newAccountPOST } from "../../api";

class AddUser extends React.Component {
  constructor(props) {
    super(props);
  }

  goBack = () => {
    this.props.history.push("/profile");
  }

  submitForm = e => {
    e.preventDefault();
    const values = Array.from(e.target.elements).map(el => [el.name, el.value]);
    const params = values.reduce((newObj, pair) => {
      let [ prop, val ] = pair;
      if (prop === "sway") prop = "priceRange";
      if (!prop) return newObj;
      return set(newObj, prop, val);
    }, {});
    
    newAccountPOST({...params, type: "admin"})
      .then(data => {
        if (data === "Email registered!") this.goBack();
        else throw new Error("Error registering email!");
      })
      .catch(err => console.log(err))
  }

  render() {

    const Input = ({field}) => {
      return (
        <div>
          <label htmlFor={field} className="label" >{titleCase(field)}: </label>
          <input type="text" name={field} />
          <br/>
        </div>
      );
    }

    return (
      <div className="mainWindow">
        <Header title="Add A New User" handler={this.goBack} />
        <div className="mainContent">
          <div className="form">
            <form onSubmit={this.submitForm}>
              <fieldset>
                <Input field="name" />
                <Input field="email" />
                <Input field="password" />
                <Input field="sway" />
                <input type="submit" style={{display: "none"}}/>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(view(AddUser));