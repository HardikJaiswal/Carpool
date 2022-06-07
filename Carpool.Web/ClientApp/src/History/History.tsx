import * as React from "react";
import RideTile from "../Common/RideTile.tsx";
import { getName } from "../Local Service/AuthService.ts";
import { getId } from "../Local Service/AuthService.ts";
import { UserService } from "../Services/UserService.ts";
import Profile from "../Common/Profile.tsx";
 
class History extends React.Component {
    constructor(props) {
        super(props);
        this.fetchData();
    }
    id = getId();
    service = new UserService();
    state = {
        offeredRides: [],
        bookedRides: [],
        user: {
            firstName: getName()[0],
            lastName: getName()[1]
        },
        loading: true
    }

    fetchData() {
        this.service.getBookedRide(this.id)
            .then((res) => {
                console.log(res.data);
                this.setState({ bookedRides: res.data, loading: false });
            })
        this.service.getOfferedRide(this.id)
            .then((res) => {
                console.log(res.data);
                this.setState({ offeredRides: res.data, loading: false });
            })
        console.log(this.state);
    }

    render() {
        return (
            <>
            <div className="dashboard-header">
                    <img src={require('../Assets/logo.png')} style={{ margin: '2% 0% 0% 5%', height: '60px' }} /><br />
                    <Profile userName={this.state.user.firstName + ' ' + this.state.user.lastName} />
                </div>
                {this.state.loading ? <h3>Loading</h3> :
                    <div className="history-container">
                        <div className="history-results">
                            <><span className="bg-purple">Booked Rides</span><br />
                                {this.state.bookedRides.map((item, pos) => {
                                    <RideTile info={item} key={pos} />
                                })}</>
                        </div>
                        <div className="history-results">
                            <><span className="bg-orange">Offered Rides</span><br />
                                {this.state.offeredRides.map((item, pos) => {
                                    <RideTile info={item} key={pos} />
                                })}</>
                        </div>
                    </div>}
            </>
        );
    }
}

export default History;