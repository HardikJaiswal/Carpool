import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {

    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
    }

    return (
        <div className="dashboard-body">
            <main className="service-menu">
                <h1><b>Hey {user.firstName}!</b></h1>&nbsp;<br />
                <div className="service-btn bg-purple" onClick={() => navigateTo('/bookride') }>Book a ride</div>
                <div className="service-btn bg-orange" onClick={() => navigateTo('/offerride') }>Offer a ride</div>
            </main>
        </div>
    );
}

export default Dashboard;