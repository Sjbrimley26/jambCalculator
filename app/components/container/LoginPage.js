import React, { Component } from "react";
import { Header } from "../presentational"
import axios from "axios";
import { Redirect } from "react-router-dom";
import { userStore } from "../../store";

class LoginPage extends Component {
  constructor(props){
    super(props);

    const alreadyHasToken = localStorage.getItem("token") ? true : false;

    this.state = {
      loggedIn: alreadyHasToken
    };
  }

  render(){

    const submitForm = e => {
      e.preventDefault();
      let email = e.target.elements[1].value;
      let password = e.target.elements[2].value;
      
      if (!email || !password) return alert("Please enter a username and password");

      axios({
          method: "POST",
          url: "https://ljzr3vjgff.execute-api.us-west-2.amazonaws.com/latest/login",
          // url : "http://localhost:3000/login",
          data: JSON.stringify({
            email,
            password
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(async res => {
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            await userStore.getUser();
            this.setState({ loggedIn: true });
          } else {
            // Show an invalid password alert!
            alert("Email or password was invalid!");
            console.log(res.data.message);
          }
        })
        .catch(err => console.log(err));

    };

    return (
      <div className="mainWindow">
        { this.state.loggedIn ? <Redirect to="/" /> : null }
        <Header title="Login" noButton={true} /> 
        <div className="mainContent">
          <div className="form">
            <form onSubmit={submitForm.bind(this)}>
              <fieldset>
                <label htmlFor="email" className="label" >Email: </label>
                <input type="text" name="email" />
                <br/>
                <label htmlFor="password" className="label" >Password: </label>
                <input type="password" name="password" />
                <input type="submit" style={{display: "none"}}/>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default LoginPage;