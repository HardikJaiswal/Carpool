import * as React from "react";
import { Navigate } from "react-router-dom";
import "../../App.css";
import { setId, setName } from "../../Local Service/AuthService.ts";
import { UserService } from "../../Services/UserService.ts";

class SignUp extends React.Component {
    service = new UserService();
    values = {
        Email: "",
        Pwd: "",
        CPwd: ""
    }
    state = {
        showPassword: false,
        redirect: false
    };
    constructor(props) {
        super(props);
    }
    fetchData() {
        this.service.getUserProfile()
            .then((res) => {
                res = res.data;
                setName(res.FirstName, res.LastName);
            });
    }

    togglePasswordDisplay() {
        this.setState({ showPassword: !this.state.showPassword });
    }

    formSubmission = (event) => {
        event.preventDefault();
        if (this.values.Pwd === this.values.CPwd) {
            let id = 0;
            this.service.createUser(this.values.Email, this.values.Pwd)
                .then((res) => {
                    id = res.data;
                    if (id != null && id != undefined && id != 0) {
                        setId(id);
                        this.fetchData();
                        this.props.onSuccess(id);
                        this.setState({ redirect: true });
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
        this.values[field] = event.target.value;
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
                                    <svg className="show-password" onClick={() => this.togglePasswordDisplay()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                        <path d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z" />
                                    </svg>
                                    :
                                    <svg className="show-password" onClick={() => this.togglePasswordDisplay()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                        <path d="M160 256C160 185.3 217.3 128 288 128C358.7 128 416 185.3 416 256C416 326.7 358.7 384 288 384C217.3 384 160 326.7 160 256zM288 336C332.2 336 368 300.2 368 256C368 211.8 332.2 176 288 176C287.3 176 286.7 176 285.1 176C287.3 181.1 288 186.5 288 192C288 227.3 259.3 256 224 256C218.5 256 213.1 255.3 208 253.1C208 254.7 208 255.3 208 255.1C208 300.2 243.8 336 288 336L288 336zM95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6V112.6zM288 80C222.8 80 169.2 109.6 128.1 147.7C89.6 183.5 63.02 225.1 49.44 256C63.02 286 89.6 328.5 128.1 364.3C169.2 402.4 222.8 432 288 432C353.2 432 406.8 402.4 447.9 364.3C486.4 328.5 512.1 286 526.6 256C512.1 225.1 486.4 183.5 447.9 147.7C406.8 109.6 353.2 80 288 80V80z" />
                                    </svg>
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