import React from "react";
import Header from "../presentational/Header"
import axios from "axios";

const LoginPage = (props) => {

  const submitForm = e => {
    e.preventDefault();
    let email = e.target.elements[1].value;
    let password = e.target.elements[2].value;
    
    
    axios({
      method: "POST",
      url: "https://ljzr3vjgff.execute-api.us-west-2.amazonaws.com/latest/login",
      body: JSON.stringify({email, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(data => console.log(data))
      .catch(err => console.log(err));
    

  }

  return (
    <div className="mainWindow">
      <Header title={"Login"} /> 
      <div className="mainContent">
        <div className="login">
          <form onSubmit={submitForm.bind(this)}>
            <fieldset>
              <label htmlFor="email" className="loginLabel" >Email: </label>
              <input type="text" name="email" />
              <br/>
              <label htmlFor="password" className="loginLabel" >Password: </label>
              <input type="password" name="password" />
              <input type="submit" style={{display: "none"}}/>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  )
};

export default LoginPage;