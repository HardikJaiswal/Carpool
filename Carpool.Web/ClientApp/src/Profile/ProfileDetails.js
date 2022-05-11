import React from "react";
import ProfileOptions from "../Common/Profile";

class Profile extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      user : [],
      id : 69
    }
  }

  findMatches(){
    fetch(`${process.env.REACT_APP_API}/UserService/getprofile?id=${this.state.id}`)
    .then((response)=>response.json())
    .then(data=>{
      this.setState((prevState)=>{
        return {user : [...prevState.user, data]}
      })
    })
  }
  
  componentDidMount(){
    this.findMatches();
    console.log(this.state.user);
  }

  render(){
    return (
      <div>
        <ProfileOptions />
        {this.state.user.map((item,pos)=>{
          return (
            <div key={pos}>
              <h4>{item.FirstName}</h4>
              <h4>{item.LastName}</h4>
              <h4>{item.Email}</h4>
              <h4>{item.UserId}</h4>
              <h4>{item.PassKey}</h4>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Profile;