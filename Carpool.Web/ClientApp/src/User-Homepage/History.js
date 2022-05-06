import React from "react";
import ProfileOptions from "./profile-options";
import axios from "axios";
import ResultTile from "./result-tile";

class History extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      offeredRides : [],
      bookedRides : []
    }
    this.id = 69;
  }

  componentDidMount(){
    axios.get("https://localhost:7165/api/UserService/getBookedRides",{id : this.id})
    .then((res) => {
      this.setState( (prevState) => {
        return {bookedRides : [...prevState.bookedRides, res.data]}
      })
    })
    axios.get("https://localhost:7165/api/UserService/getOfferedRides",{id : this.id})
    .then((res) => {
      this.setState( (prevState) => {
        return {offeredRides : [...prevState.offeredRides, res.data]}
      })
    })
  }

  render(){
    return(
      <>
      <ProfileOptions userName="temp name"/>
      <div className="history-container">
        <div className="history-results">
          <span className="bg-purple">Booked Rides</span><br/>
          {this.state.bookedRides.map((item,pos) => {
            <ResultTile info = {item} key={pos}/>
          })}
        </div>
        <div className="history-results">
          <span className="bg-orange">Offered Rides</span><br/>
          {this.state.offeredRides.map((item,pos) => {
            <ResultTile info={item} key={pos}/>
          })}
        </div>
      </div>
      </>
    );
  }
}

export default History;