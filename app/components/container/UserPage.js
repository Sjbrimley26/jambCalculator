import { view } from "react-easy-state";
import { userStore } from "../../store";
import { Header } from "../presentational";
import React from "react";
import { withRouter } from "react-router";

const verifyLogin = async () => {
  const user = {...userStore.currentUser};

  if (!user.email) {
    await userStore.logout();
    window.location.reload();
    return undefined;
  }

  return user;
};

class UserPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
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
    console.log(this.state.user);
    return (
      <div className="mainWindow">
        <Header title="Settings" handler={this.goHome}/>
        <div className="mainContent">
        </div>
      </div>
    );
  }
};

export default withRouter(view(UserPage));