import * as React from "react";
import { getId } from "../Local Service/AuthService.ts";
import { UserService } from "../Services/UserService.ts";
import Profile from "../Common/Profile.tsx";
import { getName, setName } from "../Local Service/AuthService.ts";
import { Navigate } from "react-router-dom";


export default class ProfileDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userLoginInfo: {
                Email: "",
                Passkey: ""
            },
            FirstName: getName()[0],
            LastName: getName()[1],
            id: getId(),
            redirect: false
        }
        this.findMatches = this.findMatches.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.findMatches();
    }
    styling = { border: "none", padding: "5px 8px", color: "white", borderRadius: "20%", transform: "translate(320%)" };
    userservice = new UserService();
    findMatches() {
        this.userservice.getUserProfile(this.state.id)
            .then((res) => {
                res = res.data;
                if (res.IsSuccess == true) {
                    this.setState(() => {
                        return { userLoginInfo: { Email: res.Data.Email, Passkey: res.Data.Passkey } };
                    });
                }
            });
    }
    updateFirstName(event) {
        this.setState({ FirstName : event.target.value });
    }
    updateLastName(event) {
        this.setState({ LastName: event.target.value });
    }
    enableRedirect() {
        this.setState({ redirect: true });
    }
    saveChanges(event) {
        event.preventDefault();
        this.userservice.updateName(this.state.FirstName, this.state.LastName, this.state.id)
            .then((res) => {
                res = res.data;
                if (res.IsSuccess == true) {
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
                    <Profile userName={getName()[0] + ' ' + getName()[1]} />
                </div>
                    <div className="profile-details">
                        <div className="container" style={{ padding: "1%", lineHeight: "220%", width: "25%" }}>
                        <div className="detail-item"><label>First Name</label>&emsp;
                            <input name="fName" value={this.state.FirstName} onChange={this.updateFirstName.bind(this)} /></div><br />
                        <div className="detail-item"><label>Last Name</label>&emsp;
                            <input name="lName" value={this.state.LastName} onChange={this.updateLastName.bind(this)} /></div><br />
                        <div className="detail-item"><label>Email</label>&emsp;
                            <b>{this.state.userLoginInfo.Email}</b></div><br />
                        <div className="detail-item"><label>Password</label>&emsp;
                                <b>{this.state.userLoginInfo.Passkey}</b></div><br />
                            <button className="bg-orange" style={this.styling}
                                onClick={(e) => this.saveChanges(e)}> Save </button>
                    </div>
                </div>
            </div>
        );
    }
}