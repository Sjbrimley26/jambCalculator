import { view } from "react-easy-state";
import { userStore } from "../../store";
import { Header } from "../presentational";
import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const verifyLogin = async () => {
  const user = {...userStore.currentUser};

  if (!user.email) {
    await userStore.logout();
    window.location.reload();
    return undefined;
  }

  return user;
};

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
        email: undefined,
        name: undefined,
        type: undefined
      }
    };
  }

  initialize = async () => {
    this.setState({
      user: await verifyLogin()
    });
  }

  goHome = () => {
   this.props.history.push("/");
  }

  componentDidMount(){
    this.initialize();
  }

  render(){
    const { email, name, type } = this.state.user;


    return (
      <div className="mainWindow">
        <Header title="Settings" handler={this.goHome}/>
        <div className="mainContent">
          <h3> Welcome { name }!</h3>
          <br/>
          <Link to="/changePassword" className="navLink" >Change Password</Link>
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