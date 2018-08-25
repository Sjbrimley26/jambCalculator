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
    const values = Array.from(e.target.elements).map(el => {
      if (el.type === "checkbox") {
        return [el.name, el.checked];
      }
      return [el.name, el.value];
    });

    const params = values.reduce((newObj, pair) => {
      let [ prop, val ] = pair;
      
      if (!prop) return newObj;

      if (prop === "sway") {
        prop = "priceRange";
      }

      if (prop === "admin") {
        prop = "type";
        val = val ? "admin" : "sales";
      }

      return set(newObj, prop, val);
    }, {});

    for ( let prop of Object.keys(params) ) {
      if (params[prop] === "") {
        return alert("Please fill in all fields!");
      }
    }

    if ( params.password !== params.confirm ) {
      return alert("Passwords do not match. Please re-enter passwords and try again.");
    }

    const { confirm, ...details } = params;
    
    
    newAccountPOST(details)
      .then(data => {
        if (data === "Email registered!") {
          this.goBack();
        }
        else {
          throw new Error("Error registering email!");
        }
      })
      .catch(err => console.log(err))
    
  }

  render() {

    const Input = ({ field, type = "text" }) => {
      let style = type === "checkbox" ? { width: "auto" } : null;

      if (["confirm", "password"].includes(field)) {
        type = "password";
      }

      return (
        <div>
          <label htmlFor={field} className="label" >{titleCase(field)}: </label>
          <input type={type} name={field} style={style} />
          <br/>
        </div>
      );
    };

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
                <Input field="confirm" />
                <Input field="sway" />
                <Input field="admin" type="checkbox" />
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