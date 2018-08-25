import React, { Component } from "react";
import { Header } from "../presentational"
import { userStore } from "../../store";
import set from "lodash/set";
import { changePasswordPOST } from "../../api";

class ChangePassword extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {}
    };
  }

  goBack = () => {
    this.props.history.push("/profile");
  }

  initialize = async () => {
    this.setState({
      user: await userStore.verifyLogin()
    });
  }

  componentDidMount() {
    this.initialize();
  }

  render(){

    const submitForm = e => {
      e.preventDefault();

      const values = Array.from(e.target.elements).map(el => {
        return [el.name, el.value];
      });

      const params = values.reduce((newObj, pair) => {
        let [prop, val] = pair;

        if (!prop) return newObj;

        return set(newObj, prop, val);
      }, {});

      params.email = this.state.user.email;

      if (params.newPassword !== params.confirmPassword) {
        return alert("Passwords do not match. Please re-enter and try again.");
      }

      const { confirmPassword, ...details } = params;

      changePasswordPOST(details)
        .then(data => {
          if (data == "Password changed!") {
            this.goBack();
          } else {
            console.log(data);
          }
        })
        .catch(err => console.log(err));

    };

    return (
      <div className="mainWindow">
        <Header title="Change Password" handler={this.goBack} /> 
        <div className="mainContent">
          <div className="form">
            <form onSubmit={submitForm.bind(this)}>
              <fieldset>
                <label htmlFor="existingPassword" className="label" >Existing Password: </label>
                <input type="password" name="existingPassword" />
                <br/>
                <label htmlFor="newPassword" className="label" >New Password: </label>
                <input type="password" name="newPassword" />
                <br/>
                <label htmlFor="confirmPassword" className="label" >Confirm New Password: </label>
                <input type="password" name="confirmPassword" />
                <input type="submit" style={{display: "none"}}/>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default ChangePassword;