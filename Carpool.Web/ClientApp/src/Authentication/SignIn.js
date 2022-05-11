import { useState } from "react";
import LogIn from "./Login/LogIn";
import SignUp from "./SignUp/SignUp";
import Poster from "./Poster";
import './SignIn.css'
import { useAuth } from "./Auth";

export default function SignIn() {
    const [isSignup, setIsSignUp] = useState(true);
    const auth = useAuth();
    auth.logout();

    return (
        <div className="auth-page">
            <Poster />
            {isSignup
                ? <SignUp toggleSignInOption={setIsSignUp} />
                : <LogIn toggleSignInOption={setIsSignUp} />}
        </div>
    );
}