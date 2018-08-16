import React, { Component } from "react";
import { withRouter } from 'react-router';
import { view } from 'react-easy-state';
import { Link } from "react-router-dom"
import Header from "../presentational/Header";
import doorStore from "../../store/doorStore";
import axios from "axios";



const testProfileGET = ()  => {
  const token = localStorage.getItem("token");
  
  axios({
    method: "GET",
    url: "http://localhost:3000/profile",
    headers: {
      Authorization: "Bearer " + token,
      'Content-Type': 'text/plain'
    },
  }).then(res => console.log(res.data))
    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
};

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    doorStore.goBack = false;
  }

  render() {
    
    return (
      <div className="mainWindow">
        <Header title="Home" noButton={true} />
        <div className="mainContent">
          <Link to="/build" className="navLink" > Build Calculator </Link>
          <button onClick={testProfileGET} >TEST!</button> 
        </div>
      </div>
    );
  }
}

export default withRouter(view(Home));
