import * as React from "react";
import { useNavigate } from 'react-router-dom';
import Profile from '../Common/Profile.tsx';
import { getName } from '../Local Service/AuthService.ts';
import './Dashboard.css';

function Dashboard() {

    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
    }
    const [user] = React.useState({ firstName: getName()[0], lastName: getName()[1] });


    return (
        <>
            <div className="dashboard-header">
                <img src={require('../Assets/logo.png')} style={{ margin: '2% 0% 0% 5%', height: '60px' }} /><br />
                <Profile userName={user.firstName + ' ' + user.lastName} />
            </div>
            <div className="dashboard-body">
                <main className="service-menu">
                    <h1><b>Hey {user.firstName}!</b></h1>&nbsp;<br />
                    <div className="service-btn bg-purple" onClick={() => navigateTo('/bookride')}>Book a ride</div>
                    <div className="service-btn bg-orange" onClick={() => navigateTo('/offerride')}>Offer a ride</div>
                </main>
            </div>
        </>
    );
}

export default Dashboard;