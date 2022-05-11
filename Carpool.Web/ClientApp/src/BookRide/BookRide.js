import axios from "axios";
import { useState } from "react";
import { useAuth } from "../Authentication/Auth";
import FormHeader from "../Common/FormHeader";
import RideMatchFirstForm from "../Common/RideMatchFirstForm";
import RideTile from "../History/RideTile";

function BookRide() {
    const matches = [];
    const [showMatch, setShowMatch] = useState(false);

    let formParameters = {
        source: '',
        destination: '',
        date: '',
        timeslot: -1
    };

    const setValue = (field, value) => {
        formParameters[field] = value;
    }

    const findRides = (e) => {
        e.preventDefault();
        axios.get(`${process.env.REACT_APP_API}/findride`, {
            params: {
                source: formParameters.source,
                destination: formParameters.destination,
                date: formParameters.date,
                timeslot: formParameters.timeslot
            },
            headers: {
                "Access-Control-Allow-Origin": "https://localhost:44302"
            }
        }).then((response) => {
            matches = [...matches, response.data];
        })
        setShowMatch(true);
    }

    let auth = useAuth();

    const bookride = (pos) => {
        axios.patch(`${process.env.REACT_APP_API}/bookride`, {
            bookerId: auth.userId,
            rideId: matches[pos].RideId
        }).then(() => {
            console.log("Ride booked");
        })
    }

    return (
        <div className="ride-form">
            <div className="form container">
                <FormHeader isBooking={true} /><br /><br />
                <form onSubmit={findRides}>
                    <RideMatchFirstForm isBooking={true} fillDetails={(field, value) => setValue(field, value)} />
                </form>
            </div>
            {
                showMatch ?
                <div className="ride-matches">
                    <h2 style={{ color: 'purple' }}>Your Matches</h2>
                    {matches.map((item, pos) => {
                        return (
                            <RideTile key={pos} info={item} isHistory={false} onclick={() => bookride(pos)}/>
                        );
                    })}
                </div> : null
            }
        </div>
    );
}

export default BookRide;