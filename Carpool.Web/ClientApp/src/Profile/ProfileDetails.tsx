import * as React from "react";
import { getId } from "../Local Service/AuthService.ts";
import { UserService } from "../Services/UserService.ts";
import Profile from "../Common/Profile.tsx";
import { getName, setName } from "../Local Service/AuthService.ts";
import { Navigate } from "react-router-dom";


export default class ProfileDetails extends React.Component {

    constructor(props) {
        super(props);
        this.findMatches();
    }
    service = new UserService();
    state = {
        userLoginInfo: {
            Email: "",
            Passkey: ""
        },
        FirstName: getName()[0],
        LastName: getName()[1],
        id: getId(),
        redirect: false
    }
    findMatches() {
        this.service.getUserProfile(this.state.id)
            .then((res) => {
                res = res.data;
                this.setState(() => {
                    return { userLoginInfo: { Email: res.Email, Passkey: res.Passkey } };
                });
            });
    }
    updateFName(event) {
        this.setState({ FirstName : event.target.value });
    }
    updateLName(event) {
        this.setState({ LastName: event.target.value });
    }
    enableRedirect() {
        this.setState({ redirect: true });
    }
    onButtonClick(event) {
        event.preventDefault();
        this.service.updateName(this.state.FirstName, this.state.LastName, this.state.id)
            .then((res) => {
                if (res.status == 200) {
                    alert("Changes Made");
                    setName(this.state.FirstName, this.state.LastName);
                }
            });
    }

    render() {
        return this.state.redirect ?
            <Navigate to="/" replace={true} /> : (
            <div>
                    <div className="dashboard-header">
                        <img src={require('../Assets/logo.png')} style={{ margin: '2% 0% 0% 5%', height: '60px' }}
                            onClick={() => this.enableRedirect()} /><br />
                    <Profile userName={getName()[0] + ' ' + getName()[0]} />
                </div>
                    <div className="profile-details">
                        <div className="container" style={{ padding: "1%", lineHeight: "220%", width: "25%" }}>
                        <div className="detail-item"><label>First Name</label>&emsp;
                            <input name="fName" value={this.state.FirstName} onChange={this.updateFName.bind(this)} /></div><br />
                        <div className="detail-item"><label>Last Name</label>&emsp;
                            <input name="lName" value={this.state.LastName} onChange={this.updateLName.bind(this)} /></div><br />
                        <div className="detail-item"><label>Email</label>&emsp;
                            <b>{this.state.userLoginInfo.Email}</b></div><br />
                        <div className="detail-item"><label>Password</label>&emsp;
                            <b>{this.state.userLoginInfo.Passkey}</b></div><br />
                        <button onClick={(e) => this.onButtonClick(e)}> Save </button>
                    </div>
                </div>
            </div>
        );
    }
}