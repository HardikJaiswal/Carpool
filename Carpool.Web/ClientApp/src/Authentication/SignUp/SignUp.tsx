import * as React from "react";
import { Navigate } from "react-router-dom";
import "../../App.css";
import { setId, setName } from "../../Local Service/AuthService.ts";
import { UserService } from "../../Services/UserService.ts";

class SignUp extends React.Component {
    userservice = new UserService();
    inputValues = {
        Email: "",
        Pwd: "",
        CPwd: ""
    }
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            redirect: false
        };
    }
    fetchData(id: number) {
        this.userservice.getUserProfile(id)
            .then((res) => {
                res = res.data;
                setName(res.FirstName, res.LastName);
                this.props.onSuccess(id);
                this.setState({ redirect: true });
            });
    }

    togglePasswordDisplay() {
        this.setState({ showPassword: !this.state.showPassword });
    }

    formSubmission = (event) => {
        event.preventDefault();
        if (this.inputValues.Pwd === this.inputValues.CPwd) {
            this.userservice.createUser(this.inputValues.Email, this.inputValues.Pwd)
                .then((res) => {
                    res = res.data;
                    if (res.IsSuccess == true) {
                        setId(res.Data);
                        this.fetchData(res.Data);
                    } else {
                        console.log("Request not succeded");
                    }
                })
        } else {
            console.log("Password not same.");
        }
    }

    getValues = (event) => {
        let field = event.target.name;
        this.inputValues[field] = event.target.value;
    }
    
    render() {
        return (
            this.state.redirect ?
                <Navigate to="/" replace={true}/> :
                (<div className="sign-in bg-orange">
                    <h1>Sign Up</h1><br />
                    <form onSubmit={this.formSubmission.bind(this)}>
                        <div className="input-area">
                            <input type="email" className="input-text" name="Email" onChange={this.getValues.bind(this)} required />
                            <span className="floating-text">Enter Email Id</span>
                        </div>
                        <br />
                        <div className="input-area">
                            <input type={this.state.showPassword ? "text" : "password"} name="Pwd" className="input-text" onChange={this.getValues.bind(this)} required />
                            <span className="floating-text">Enter Password</span>
                            {
                                this.state.showPassword
                                    ?
                                    <i className="fa-solid fa-eye" onClick={this.togglePasswordDisplay.bind(this)}></i>
                                    : 
                                    <i className="fa-solid fa-eye-low-vision" onClick={this.togglePasswordDisplay.bind(this)}></i>
                            }
                        </div>
                        <br />
                        <div className="input-area">
                            <input type="password" className="input-text" name="CPwd" onChange={this.getValues.bind(this)} required />
                            <span className="floating-text">Confirm Password</span>
                        </div>
                        <br /><br />
                        <button className="submit-btn bg-purple"><b>Submit</b></button>
                        <br /><br />
                    </form>
                    <span>Already a member ?&nbsp;
                        <b style={{ cursor: "pointer" }} onClick={() => this.props.toggleSignInOption(false)}>
                            LOG IN
                        </b>
                    </span>
                </div>)
        );
    }
}

export default SignUp;