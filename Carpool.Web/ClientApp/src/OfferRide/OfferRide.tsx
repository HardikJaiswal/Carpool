import * as React from "react";
import FormHeader from "../Common/FormHeader.tsx";
import Profile from "../Common/Profile.tsx";
import RideMatchFirstForm from "../Common/RideMatchFirstForm.tsx";
import { RideService } from "../Services/RideService.ts";
import { getId, getName } from "../Local Service/AuthService.ts";
import { Navigate } from "react-router-dom";

class OfferRide extends React.Component{
    service = new RideService();
    state = {
        seatCount: 0,
        totalStops: 1,
        displaySecondForm: false,
        redirect: false,
        user: {
            firstName: getName()[0],
            lastName: getName()[1]
        }
    }
    FormParameters = {
        startLocation: '',
        endLocation: '',
        bookingDate: '',
        timeSlot: -1,
        seats: this.state.seatCount + 1,
        stops: [],
        userId: getId(),
        price: 100
    };
    constructor(props) {
        super(props);
    }
    
    addNewStop = () => {
        if (this.state.totalStops < 3) {
            this.setState((prevState) => {
                return {totalStops: prevState.totalStops + 1}
            })
        }
    }
    stopsDiv = React.createRef<HTMLDivElement>();
    
    onFormSubmit = (event) => {
        event.preventDefault();
        const div = this.stopsDiv.current;
        for (let i = 0; i < div.children.length; i++) {
            if (div.children[i].tagName === "Input") {
                this.FormParameters.stops.push(div.children[i].value);
            }
        }
        this.service.offerRide(this.FormParameters)
            .then((res) => {
                console.log(res.status);
            });
        alert('Ride Offered Successfully');
        this.setState({ redirect: true });
    }
    onNextBtnClick = (event) => {
        event.preventDefault();
        this.setState({displaySecondForm: true});
    }
    setFormValues = (field, value) => {
        this.FormParameters[field] = value;
    }
    setSeatCount = (event, pos) => {
        event.preventDefault();
        this.FormParameters.seats = pos + 1;
        this.setState({seatCount: pos});
    }
    secondForm = (
        <div>
            <div className='container ride-form-2'>
                <FormHeader isBooking={false} /><br /><br />
                <div ref={this.stopsDiv}>
                    <div className="inputs">
                        <label>Stop 1</label><br />
                        <input type="text" placeholder="First Stop" required />
                    </div>
                    {Array.from(Array(this.state.totalStops), (_, index) => index + 1).map((item) => {
                        if (item < this.state.totalStops && item < 4) {
                            return (
                                <div className="inputs">
                                    <label>Stop {item + 1}</label><br />
                                    <input type="text" placeholder="Next Stop" required />
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
                <svg className="add-stop" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" onClick={this.addNewStop}>
                    <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
                </svg>
                <div className="split-in-two">
                    <div>
                        <label>Availbale Seats</label><br />
                        {Array.from(Array(4), (_, index) => index + 1).map((item, pos) => {
                            let classArr = ['seats'];
                            if (pos === this.state.seatCount) classArr.push('seat-selected');
                            return (
                                <button className={classArr.join(' ')} key={pos} onClick={(e) => this.setSeatCount(e,pos)}>
                                    {item}
                                </button>);
                        })}
                    </div>
                    <div className="ride-cost">
                        <label>Price</label><br />
                        {/*<input type="number"/> */}
                        <span>180&#36;</span>
                    </div>
                </div><br /><br />
                <input type="submit" value="Submit" className="bg-orange" />
            </div>
        </div>
    );
    render(){
        return (
            this.state.redirect ? 
                <Navigate to="/" replace={true} /> :
            <>
                <div className="dashboard-header">
                    <img src={require('../Assets/logo.png')} style={{ margin: '2% 0% 0% 5%', height: '60px' }} /><br />
                    <Profile userName={this.state.user.firstName + ' ' + this.state.user.lastName} />
                </div>
                <form onSubmit={this.onFormSubmit.bind(this)}>
                    <div className="ride-form">
                        <div className="container form">
                            <FormHeader isBooking={false} /><br /><br />
                            <RideMatchFirstForm isBooking={false} fillDetails={(field, value) => this.setFormValues(field, value)}
                                viewNextForm={(e) => this.onNextBtnClick(e)} />
                        </div>
                        {this.state.displaySecondForm ? this.secondForm : null}
                    </div>
                </form>
            </>
        );
    }
}

export default OfferRide;