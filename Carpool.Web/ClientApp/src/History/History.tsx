import * as React from "react";
import RideTile from "../Common/RideTile.tsx";
import { getName } from "../Local Service/AuthService.ts";
import { getId } from "../Local Service/AuthService.ts";
import { UserService } from "../Services/UserService.ts";
import Profile from "../Common/Profile.tsx";
import { Navigate } from "react-router-dom";
 
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
        loading: true,
        redirect: false
    }
    enableRedirect() {
        this.setState({ redirect: true });
    }

    fetchData() {
        this.service.getBookedRide(this.id)
            .then((res) => {
                console.log(res.data);
                this.setState({ bookedRides: Array.from(res.data), loading: false });
            })
        this.service.getOfferedRide(this.id)
            .then((res) => {
                console.log(res.data);
                this.setState({ offeredRides: Array.from(res.data), loading: false });
            })
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/" replace={true} />
        } else {
            return (
                <>
                    <div className="dashboard-header">
                        <img src={require('../Assets/logo.png')} style={{ margin: '2% 0% 0% 5%', height: '60px' }}
                            onClick={() => this.enableRedirect()} /><br />
                        <Profile userName={this.state.user.firstName + ' ' + this.state.user.lastName} />
                    </div>
                    {this.state.loading ? <h3>Loading</h3> :
                        <div className="history-container">
                            <div className="history-results">
                                <><span className="bg-purple">Booked Rides</span><br />
                                    {this.state.bookedRides.map((item, pos) => {
                                        return <RideTile key={pos} info={item} isHistory={true} onclick={() => { }} />
                                    })}</>
                            </div>
                            <div className="history-results">
                                <><span className="bg-orange">Offered Rides</span><br />
                                    {this.state.offeredRides.map((item, pos) => {
                                        return <RideTile key={pos} info={item} isHistory={true} onclick={() => { }} />
                                    })}</>
                            </div>
                        </div>}
                </>
            );
        }
    }
}

export default History;