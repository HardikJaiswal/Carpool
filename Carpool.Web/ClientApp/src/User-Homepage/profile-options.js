import {Link} from 'react-router-dom';
import Popup from "reactjs-popup";

function ProfileOptions(props){
  return (
    <Popup trigger={<div className="user-info">  
        <b>{props.userName}</b>&emsp;
        <img src={require('./profile-photo.jpg')} /></div>} >
      <div className="profile-menu">
        <Link className="menu-item" to='/profile'>Profile</Link>
        <Link className="menu-item" to='/history'>My Rides</Link>
        <div className="menu-item">Log Out</div>
      </div>
    </Popup>
  );
}

export default ProfileOptions;