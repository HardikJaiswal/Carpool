import * as React from "react";
import { UserService } from '../../Services/UserService.ts';
import { setId, setName } from "../../Local Service/AuthService.ts";
import { Navigate } from "react-router-dom";

export default class LogIn extends React.Component {
    userservice = new UserService();
    loginRequest = {
        Email: "",
        Password: ""
    };
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
        this.attemptlogin = this.attemptlogin.bind(this);
    }
    
    getInput = (event) => {
        let field = event.target.name;
        this.loginRequest[field] = event.target.value;
    }
    attemptlogin = (event) => {
        event.preventDefault();
        this.userservice.loginUser(this.loginRequest.Email, this.loginRequest.Password)
        .then(res => {
            res = res.data;
            if (res.IsSuccess == true) {
                setId(res.Data);
                this.userservice.getUserProfile(res.Data)
                    .then((response) => {
                        response = response.data.Data;
                        setName(response.FirstName, response.LastName);
                        this.props.onSuccess(res.Data);
                        this.setState({ redirect: true });
                    });
            } else {
                console.log("Error in logging in");
            }
        }, (exception => {
            console.log(exception);
        }));
    }

    render() {
        return (
            this.state.redirect ?
                <Navigate to="/" replace={true} /> :
                (<div className="sign-in bg-purple" >
                    <h1>Log In </h1><br />
                    <form onSubmit={(e) => this.attemptlogin(e)}>
                        <div className="input-area" >
                            <input type="email" className="input-text" name="Email" onChange={this.getInput.bind(this)} required />
                            <span className="floating-text" > Enter Email Id </span>
                        </div>< br />
                        <div className="input-area" >
                            <input type="password" className="input-text" name="Pwd" onChange={this.getInput.bind(this)} required />
                            <span className="floating-text" > Enter Password </span>
                        </div>< br /> <br />
                        < input className="submit-btn bg-orange" type="submit" value="Submit" /> <br /><br />
                    </form>
                    <span > Not a member yet ?&nbsp;
                        <b style={{ cursor: "pointer" }} onClick={() => this.props.toggleSignInOption(true)}>
                            SIGN UP
                        </b>
                    </span>
                </div>)
        );
    }
}