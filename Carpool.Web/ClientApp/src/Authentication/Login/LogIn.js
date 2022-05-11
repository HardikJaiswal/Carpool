import React from "react";
import axios from 'axios';
import { useAuth } from "../Auth";
import { useNavigate } from "react-router-dom";


function LogIn(props) {

    let val = {
        Email: "",
        Pwd: ""
    };

    const auth = useAuth();
    const navigate = useNavigate();

    const getValues = (event) => {
        let field = event.target.name;
        val[field] = event.target.value;
    }

    const loginAttempt = (event) => {
        event.preventDefault();
        axios.get(`${process.env.REACT_APP_API}/UserService/getuser`, {
            params : {
                email : val.Email,
                password : val.Pwd
            }
        })
        .then((response) => {
            let id = response.data[0];
            if( id!=0 ){
                auth.login(id);
                navigate('/');
            }
            console.log(response.data);
        });
    }

    return (
      <div className="sign-in bg-purple">
        <h1>Log In</h1><br />
        <form onSubmit={loginAttempt.bind(this)}>
          <div className="input-area">
            <input type="email" className="input-text" name="Email" onChange={getValues.bind(this)} required/>
            <span className="floating-text">Enter Email Id</span>
          </div>
          <br />
          <div className="input-area">
            <input type="password" className="input-text" name="Pwd" onChange={getValues.bind(this)} required/>
            <span className="floating-text">Enter Password</span>
          </div>
          <br /><br />
          <input className="submit-btn bg-orange" type="submit" value="Submit" />
          <br /><br />
        </form>
        <span>Not a member yet ?&nbsp;
                <b style={{ cursor: "pointer" }} onClick={() => props.toggleSignInOption(true)}>
            SIGN UP
          </b>
        </span>
      </div>
    );
}

export default LogIn;