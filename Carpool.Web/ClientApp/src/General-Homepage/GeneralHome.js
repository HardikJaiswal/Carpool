import React from "react";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Poster from "./Poster";
import {Navigate} from 'react-router-dom';
import "./general-page.css";

class GeneralHome extends React.Component {
  state = {
    IsSignUp : false,
    IsLoggedIn : false
  }

  showSignup = () => {
    this.setState((prevState) => {
      return {IsSignUp: !prevState.IsSignUp}
    });
  }

  loginSuccessFull = () =>{
    this.setState((prevState) => {
      return {IsLoggedIn: !prevState.IsLoggedIn}
    });
  }
  
  render() {
    return (
      <>
        {this.state.IsLoggedIn ?
         <Navigate to='/user-home' />
        : <div className="general-home">
            <Poster />
            {this.state.IsSignUp ? 
            <SignUp onLoginClick={this.showSignup} whenSucess={this.loginSuccessFull}/> : 
            <LogIn onSignupClick={this.showSignup} whenSucess={this.loginSuccessFull}/>}
          </div>
         }
      </>
    );
  }
}

export default GeneralHome;