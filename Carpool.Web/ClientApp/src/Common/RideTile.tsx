import * as React from "react";

function RideTile(props) {
    const item = props.info;
    const timings = ['5am-9am', '9am-12pm', '12pm-3pm', '3pm-6pm', '6pm-9pm'];
    const getTime = (hour) => {
        if (hour < 9) return timings[0];
        else if (hour < 12) return timings[1];
        else if (hour < 15) return timings[2];
        else if (hour < 18) return timings[3];
        else return timings[4];
    }
    return (
        <div className="container match" onClick={() => props.onclick()}>
            <div className="tile-header">
                <b>{item.OfferedBy}</b>
                <img src={require("../Assets/profile-photo.jpg")} />
            </div>
            <div className="split-in-two">
                <div>
                    <label>From</label><br />
                    {item.Source}
                </div>
                <div>
                    <label>To</label><br />
                    {item.Destination}
                </div>
                <div>
                    <label>Date</label><br />
                    {item.BookingDate.substring(0,10)}
                </div>
                <div>
                    <label>Time</label><br />
                    {getTime(parseInt(item.BookingDate.substring(11, 13)))}
                </div>
                <div>
                    <label>Price</label><br />
                    {item.SeatPrice}&#36;
                </div>
                <div>
                    <label>{props.isHistory ? 'Seats' : 'Seat Availability'}</label><br />
                    {item.AvailableSeats < 10 ? '0' + item.AvailableSeats : item.AvailableSeats}
                </div>
            </div>
        </div>
    );
}

export default RideTile;