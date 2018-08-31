import { view } from "react-easy-state";
import { userStore } from "../../store";
import { Header } from "../presentational";
import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const AdminLinks = () => {
  return (
    <div>
      <Link to="/addUser" className="navLink" >Add a User</Link>
      <br/>
      <Link to="/teamSettings" className="navLink" >Change Team Settings</Link>
    </div>
  );
};

class UserPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: {
        name: undefined,
        type: undefined
      }
    };
  }

  initialize = async () => {
    this.setState({
      user: await userStore.verifyLogin()
    });
  }

  goHome = () => {
   this.props.history.push("/");
  }

  componentDidMount(){
    this.initialize();
  }

  render(){
    let { name, type } = this.state.user;
    
    if (name) {
      let spaceIndex = name.indexOf(" ");

      if ( spaceIndex >= 0 ) {
        name = name.slice(0, spaceIndex);
      }
    }


    return (
      <div className="mainWindow">
        <Header title="Settings" handler={this.goHome}/>
        <div className="mainContent">
          <h3> Welcome { name }!</h3>
          <br/>
          {
            name !== "Guest" ? <Link to="/changePassword" className="navLink" >Change Password</Link> : null
          }
          {
            type === "admin" ?
              <AdminLinks />
            : null
          }
        </div>
      </div>
    );
  }
};

export default withRouter(view(UserPage));