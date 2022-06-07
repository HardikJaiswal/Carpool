import * as React from "react";
import { Link, useNavigate } from 'react-router-dom';
import Popup from "reactjs-popup";
import { setId } from "../Local Service/AuthService.ts";

function Profile(props) {

    const navigate = useNavigate();

    const handleLogout = () => {
        setId(0);
        navigate('/login');
    }

    return (
        <Popup trigger={
            <div className="user-info">
                <b>{props.userName}</b>&emsp;
                <img src={require('../Assets/profile-photo.jpg')} />
            </div>} >
            <div className="profile-menu">
                <Link className="menu-item" to='/profile'>Profile</Link>
                <Link className="menu-item" to='/history'>My Rides</Link>
                <div className="menu-item" onClick={handleLogout}>Log Out</div>
            </div>
        </Popup>
    );
}

export default Profile;