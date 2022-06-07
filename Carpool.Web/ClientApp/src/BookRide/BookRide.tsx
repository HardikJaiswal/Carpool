import * as React from "react";
import { RideService } from "../Services/RideService.ts";
import FormHeader from "../Common/FormHeader.tsx";
import RideMatchFirstForm from "../Common/RideMatchFirstForm.tsx";
import RideTile from "../Common/RideTile.tsx";
import Profile from "../Common/Profile.tsx";
import { getId, getName } from "../Local Service/AuthService.ts";
import { Navigate } from "react-router-dom";

export default class BookRide extends React.Component {
    service = new RideService();
    auth = getId();
    formParameters = {
        startLocation: '',
        endLocation: '',
        bookingDate: '',
        timeSlot: 0
    };
    state = {
        showMatch: false,
        redirect: false,
        matches: [],
        user: {
            firstName: getName()[0],
            lastName: getName()[1]
        }
    }

    constructor(props) {
        super(props);
    }

    setValue = (field, value) => {
        this.formParameters[field] = value;
    }
    findRides = (e) => {
        e.preventDefault();
        this.service.findMatchingRides(this.formParameters)
            .then((response) => {
                this.setState({ matches: Array.from(response.data) });
            });
        this.setState({showMatch: true});
    }

    bookSelectedRide = (pos) => {
        this.service.bookRide(this.state.matches[pos].RideId, this.auth)
            .then((res) => {
                console.log(res.status);
                if (res.status == 200) alert('Ride Booked Successfully');
                else alert("You clicked but nothing happened");
                this.setState({ redirect: true });
            });
    }
    render(){
        return (
            this.state.redirect ?
                <Navigate to="/" replace={true} /> :
                <>
                <div className="dashboard-header">
                    <img src={require('../Assets/logo.png')} style={{ margin: '2% 0% 0% 5%', height: '60px' }} /><br />
                    <Profile userName={this.state.user.firstName + ' ' + this.state.user.lastName} />
                </div>
                <div className="ride-form">
                    <div className="form container">
                        <FormHeader isBooking={true} /><br /><br />
                        <form onSubmit={this.findRides.bind(this)}>
                            <RideMatchFirstForm isBooking={true} fillDetails={(field, value) => this.setValue(field, value)} />
                        </form>
                    </div>
                    {
                        this.state.showMatch ?
                            <div className="ride-matches">
                                <h2 style={{ color: 'purple',height: '30px',gridColumnEnd: 'span 2' }}>Your Matches</h2>
                                {this.state.matches.map((item, pos) => {
                                    return (
                                        <RideTile key={pos} info={item} isHistory={false} onclick={() => this.bookSelectedRide(pos)} />
                                    );
                                })}
                            </div> : null
                    }
                </div></>
        );
    }
}