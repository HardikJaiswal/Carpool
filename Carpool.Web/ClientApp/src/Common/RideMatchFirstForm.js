import React, { useState } from "react";

function RideMatchFirstForm(props) {
  
  let timings = [
        {start: 5, end: 9, beforeNoon: true},
        {start: 9, end: 12, beforeNoon: true},
        {start: 12, end: 3, beforeNoon: false},
        {start: 3, end: 6, beforeNoon: false},
        {start: 6, end: 9, beforeNoon: false}
    ];

    let [selectedTimeslot, setSelectedTimeslot] = useState(0);
    const getValues = (event) => {
        let field = event.target.name;
        let value = event.target.value;
        props.fillDetails(field, value);
    }
    const setTimeslot = (pos) => {
        props.fillDetails('timeslot',pos);
        setSelectedTimeslot(pos);
    }

    return (
      <>
        <div className="inputs">
            <label>From</label><br />
            <input type="text" placeholder="Start Point" name="source" onChange={getValues.bind(this)} required />
        </div>
        <div className="inputs">
            <label>To</label><br/>
            <input type="text" placeholder="End Point" name="destination" onChange={getValues.bind(this)} required/>
        </div>
        <div className="inputs">
          <label>Date</label><br/> 
            <input type="date" placeholder="xx/mm/yyyy" name="date" onChange={getValues.bind(this)} required/><br/>
        </div>
        <label>Time</label>
        <div className="time-selection">
            {
                timings.map((item, pos) => {
                  const classArr = ['times'];
                  if (pos == selectedTimeslot) classArr.push('time-selected');
                  return (
                      <button className={classArr.join(' ')} key={pos} onClick={() => setTimeslot(pos)}>
                        {item.start}{item.beforeNoon?'am':'pm'} - {item.end}{item.beforeNoon?item.end==12?'pm':'am':item.end==12?'am':'pm'}
                      </button>
                  );
                })
            }
        </div><br/><br/>
        {
          props.isBooking ?
          <input type="submit" value="Submit" className="bg-orange"/> :
          <b className="next">Next &#187;</b>
        }
      </>
    );
}

export default RideMatchFirstForm;