import * as React from "react";
import { UserService } from '../../Services/UserService.ts';
import { setId, setName } from "../../Local Service/AuthService.ts";
import { Navigate } from "react-router-dom";

export default class LogIn extends React.Component {
    state = {
        redirect: false
    }
    service = new UserService();
    val = {
        Email: "",
        Pwd: ""
    };
    constructor(props) {
        super(props);
    }
    
    getValues = (event) => {
        let field = event.target.name;
        this.val[field] = event.target.value;
    }
    onlogin = (event) => {
        event.preventDefault();
        this.service.loginUser(this.val.Email, this.val.Pwd)
        .then(res => {
            res = res.data;
            if (res != undefined && res != null && res > 0) {
                setId(res);
                this.service.getUserProfile(res)
                    .then((response) => {
                        response = response.data;
                        setName(response.FirstName, response.LastName);
                        this.props.onSuccess(res);
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
                    <form onSubmit={this.onlogin.bind(this)}>
                        <div className="input-area" >
                            <input type="email" className="input-text" name="Email" onChange={this.getValues.bind(this)} required />
                            <span className="floating-text" > Enter Email Id </span>
                        </div>< br />
                        <div className="input-area" >
                            <input type="password" className="input-text" name="Pwd" onChange={this.getValues.bind(this)} required />
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