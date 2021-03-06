import LogIn from './Login/Login.tsx';
import SignUp from "./SignUp/SignUp.tsx";
import Poster from "./Poster.tsx";
import './SignIn.css';
import * as React from "react";
import { setId, setName } from '../Local Service/AuthService.ts';

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        setId(0);
        setName("", "");
        this.state = {
            isSignUp: false
        };
        this.setIsSignUp = this.setIsSignUp.bind(this);
    }
    setIsSignUp(value: boolean) {
        this.setState({ isSignUp: value });
    }

    render(){
        return (
            <div className="auth-page">
                <Poster />
                {this.state.isSignUp
                    ? <SignUp toggleSignInOption={(val) => this.setIsSignUp(val)} onSuccess={(val) => this.props.onSuccess(val)}/>
                    : <LogIn toggleSignInOption={(val) => this.setIsSignUp(val)} onSuccess={(val) => this.props.onSuccess(val)} />}
            </div>
        );   
    }
}