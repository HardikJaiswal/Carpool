import React from "react";
import ResultTile from "./result-tile";

class RideMatchResult extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      matches : [
        {
          firstName : 'Clint',
          lastName : 'Barton',
          from : 'Cincinnati',
          to : 'Minneapolis',
          date : 'xx/mm/yyyy',
          time : '5am-9am',
          price : 180,
          seats : 2
        }
      ]
    }
  }

  // findMatches(){
  //   fetch(process.env.REACT_APP_API+'Matches')
  //   .then(response=>response.json())
  //   .then(data=>{
  //     this.setState({matches : data})
  //   })
  // }
  
  // componentDidMount(){
  //   this.findMatches();
  // }

  // componentDidUpdate(){
  //   this.findMatches();
  // }

  render(){
    return (
      <div>
        <h2 style={{color:'purple'}}>Your Matches</h2>
        {this.state.matches.map((item,pos) => {
          return (
            <ResultTile key={pos} info={item} isHistory={false}/>
          );
        })}
      </div>
    );
  }
}

export default RideMatchResult;