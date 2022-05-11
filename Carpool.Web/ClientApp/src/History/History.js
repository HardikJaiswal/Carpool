import React from "react";
import axios from "axios";
import ResultTile from "./RideTile";

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
      axios.get("https://localhost:7165/api/UserService/getBookedRides", {
          params: {
              id: this.id
          },
          headers: {
              "Access-Control-Allow-Origin": "https://localhost:44302"
          }
      })
    .then((res) => {
      this.setState( (prevState) => {
        return {bookedRides : [...prevState.bookedRides, res.data]}
      })
    })
      axios.get("https://localhost:7165/api/UserService/getOfferedRides", {
          params: {
              id: this.id
          },
          headers: {
              "Access-Control-Allow-Origin": "https://localhost:44302"
          }
      })
    .then((res) => {
      this.setState( (prevState) => {
        return {offeredRides : [...prevState.offeredRides, res.data]}
      })
    })
  }

  render(){
    return(
      <>
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