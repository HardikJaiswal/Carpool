import * as React from "react";
import FormHeader from "../Common/FormHeader.tsx";
import Profile from "../Common/Profile.tsx";
import RideMatchFirstForm from "../Common/RideMatchFirstForm.tsx";
import { RideService } from "../Services/RideService.ts";
import { getId, getName } from "../Local Service/AuthService.ts";
import { Navigate } from "react-router-dom";

class OfferRide extends React.Component{
    service = new RideService();
    FormInputParameters = {
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
        this.state = {
            seatCount: 0,
            totalStops: 1,
            displaySecondForm: false,
            redirect: false,
            userName: {
                firstName: getName()[0],
                lastName: getName()[1]
            }
        }
    }
    
    addNewStop = () => {
        if (this.state.totalStops < 3) {
            this.setState((prevState) => {
                return {totalStops: prevState.totalStops + 1}
            })
        }
    }
    stopsDiv = React.createRef<HTMLDivElement>();
    
    onFormSubmission = (event) => {
        event.preventDefault();
        const div = this.stopsDiv.current;
        for (let i = 0; i < div.children.length; i++) {
            if (div.children[i].tagName === "Input") {
                this.FormInputParameters.stops.push(div.children[i].value);
            }
        }
        this.service.offerRide(this.FormInputParameters)
            .then((res) => {
                res = res.data;
                if (res.IsSuccess == true) {
                    alert('Ride Offered Successfully');
                } else {
                    alert("An error occured");
                }
            });
    }
    enableRedirect() {
        this.setState({ redirect: true });
    }
    onNextBtnClick = (event) => {
        event.preventDefault();
        this.setState({displaySecondForm: true});
    }
    setFormValues = (field, value) => {
        this.FormInputParameters[field] = value;
    }
    setSeatCount = (event, pos) => {
        event.preventDefault();
        this.FormInputParameters.seats = pos + 1;
        this.setState({seatCount: pos});
    }
    render(){
        return (
            this.state.redirect ? 
                <Navigate to="/" replace={true} /> :
            <>
                <div className="dashboard-header">
                        <img src={require('../Assets/logo.png')} style={{ margin: '2% 0% 0% 5%', height: '60px' }}
                            onClick={() => this.enableRedirect() }/><br />
                    <Profile userName={this.state.userName.firstName + ' ' + this.state.userName.lastName} />
                </div>
                <form onSubmit={this.onFormSubmission.bind(this)}>
                    <div className="ride-form">
                        <div className="container form">
                            <FormHeader isBooking={false} /><br /><br />
                            <RideMatchFirstForm isBooking={false} fillDetails={(field, value) => this.setFormValues(field, value)}
                                viewNextForm={(e) => this.onNextBtnClick(e)} />
                        </div>
                            {this.state.displaySecondForm ?
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
                                        <i className="fa-solid fa-plus" onClick={this.addNewStop}></i>
                                        <div className="split-in-two">
                                            <div>
                                                <label>Availbale Seats</label><br />
                                                {Array.from(Array(4), (_, index) => index + 1).map((item, pos) => {
                                                    let classArr = ['seats'];
                                                    if (pos === this.state.seatCount) classArr.push('seat-selected');
                                                    return (
                                                        <button className={classArr.join(' ')} key={pos} onClick={(e) => this.setSeatCount(e, pos)}>
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
                                : null}
                    </div>
                </form>
            </>
        );
    }
}

export default OfferRide;