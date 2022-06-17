import * as React from "react";
import { RideService } from "../Services/RideService.ts";
import FormHeader from "../Common/FormHeader.tsx";
import RideMatchFirstForm from "../Common/RideMatchFirstForm.tsx";
import RideTile from "../Common/RideTile.tsx";
import Profile from "../Common/Profile.tsx";
import { getId, getName } from "../Local Service/AuthService.ts";
import { Navigate } from "react-router-dom";

export default class BookRide extends React.Component {
    rideservice = new RideService();
    authId = getId();
    formInputs = {
        startLocation: '',
        endLocation: '',
        bookingDate: '',
        timeSlot: 0
    };

    constructor(props) {
        super(props);
        this.state = {
            showMatchedRides: false,
            redirect: false,
            matchedRides: [],
            userName: {
                firstName: getName()[0],
                lastName: getName()[1]
            }
        }
    }

    setValue = (field, value) => {
        this.formInputs[field] = value;
    }
    findRides = (e) => {
        e.preventDefault();
        this.rideservice.findMatchingRides(this.formInputs)
            .then((response) => {
                response = response.data;
                if (response.IsSuccess == true) {
                    this.setState({ matchedRides: Array.from(response.Data) });
                }
            });
        this.setState({showMatchedRides: true});
    }

    bookSelectedRide = (pos) => {
        this.rideservice.bookRide(this.state.matchedRides[pos].Id, this.authId)
            .then((res) => {
                if (res.data.IsSuccess == true) {
                    alert('Ride Booked Successfully');
                    this.enableRedirect();
                } else alert("Some error occured");
            });
    }
    enableRedirect() {
        this.setState({ redirect: true });
    }

    render(){
        return (
            this.state.redirect ?
                <Navigate to="/" replace={true} /> :
                <>
                <div className="dashboard-header">
                        <img src={require('../Assets/logo.png')} style={{ margin: '2% 0% 0% 5%', height: '60px' }}
                            onClick={this.enableRedirect.bind(this)} /><br />
                    <Profile userName={this.state.userName.firstName + ' ' + this.state.userName.lastName} />
                </div>
                <div className="ride-form">
                    <div className="form container">
                        <FormHeader isBooking={true} /><br /><br />
                        <form onSubmit={this.findRides.bind(this)}>
                            <RideMatchFirstForm isBooking={true} fillDetails={(field, value) => this.setValue(field, value)} />
                        </form>
                    </div>
                    {
                        this.state.showMatchedRides ?
                            <div className="ride-matches">
                                <h2 style={{ color: 'purple',height: '30px',gridColumnEnd: 'span 2' }}>Your Matches</h2>
                                {this.state.matchedRides.map((item, pos) => {
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