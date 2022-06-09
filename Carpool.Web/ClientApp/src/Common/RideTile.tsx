import * as React from "react";

function RideTile(props) {
    const item = props.info;
    const timings = ['5am-9am', '9am-12pm', '12pm-3pm', '3pm-6pm', '6pm-9pm'];
    return (
        <div className="container match" onClick={() => props.onclick()}>
            <div className="tile-header">
                <b>{item.FirstName} {item.LastName}</b>
                <img src={require("../Assets/profile-photo.jpg")} />
            </div>
            <div className="split-in-two">
                <div>
                    <label>From</label><br />
                    {item.StartLocation}
                </div>
                <div>
                    <label>To</label><br />
                    {item.EndLocation}
                </div>
                <div>
                    <label>Date</label><br />
                    {item.BookingDate}
                </div>
                <div>
                    <label>Time</label><br />
                    {timings[item.TimeSlot]}
                </div>
                <div>
                    <label>Price</label><br />
                    {item.Price}&#36;
                </div>
                <div>
                    <label>{props.isHistory ? 'Seats' : 'Seat Availability'}</label><br />
                    {item.Seats < 10 ? '0' + item.Seats : item.Seats}
                </div>
            </div>
        </div>
    );
}

export default RideTile;