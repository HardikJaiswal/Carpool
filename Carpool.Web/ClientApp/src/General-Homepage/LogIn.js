import React from "react";
import axios from 'axios';


class LogIn extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      values : {
        Email : "",
        Pwd : ""
      }
    }
    this.val = this.state.values;
  }
  getValues(event){
    let field = event.target.name;
    this.val[field] = event.target.value;
  }

  loginAttempt(event){
    // axios.get("https://localhost:7165/api/UserService/getuser",{
    //   params : {
    //     email : this.val.Email,
    //     password : this.val.Pwd
    //   }
    // })
    // .then((response) => {
    //   // if(response.data[0]!=0){
    //   //   this.props.whenSuccess();
    //   // }
    //   console.log(response.data);
    // });
    fetch(`https://localhost:7165/api/UserService/getuser?email=${this.val.Email}&password=${this.val.Pwd}`)
    .then(data => data.json())
    .then( (data) => {
      console.log(data[0]);
    })
    event.preventDefault();
  }

  render(){
    return (
      <div className="sign-in">
        <h1>Log In</h1><br />
        <form onSubmit={this.loginAttempt.bind(this)}>
          <div className="input-area">
            <input type="email" className="input-text" name="Email" onChange={this.getValues.bind(this)} required/>
            <span className="floating-text">Enter Email Id</span>
          </div>
          <br />
          <div className="input-area">
            <input type="password" className="input-text" name="Pwd" onChange={this.getValues.bind(this)} required/>
            <span className="floating-text">Enter Password</span>
          </div>
          <br /><br />
          <input className="submit-btn bg-orange" type="submit" value="Submit" />
          <br /><br />
        </form>
        <span>Not a member yet ?&nbsp;
          <b style={{cursor: "pointer"}} onClick={() => this.props.onSignupClick()}>
            SIGN UP
          </b>
        </span>
      </div>
    );
  }
}

export default LogIn;