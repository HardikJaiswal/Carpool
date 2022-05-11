import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";
import '../Dashboard/Dashboard.css';


export default function requiresAuth(props) {
    const auth = useAuth();

    if (auth.userId == 0) {
        return <Navigate to='/login' />
    }
    
    const user = {
        firstName: 'John',
        lastName: 'Wills'
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/getprofile`, {
            params: {
                id: auth.userId
            },
            headers: {
                "Access-Control-Allow-Origin": "https://localhost:44302"
            }
        })
        .then((response) => {
            let info = response.data;
            user.firstName = info.firstName;
            user.lastName = info.lastName;
        });
    });

    return (
        <>
            <div className="dashboard-header">
                <img src={require('./Assets/logo.png')} style={{ margin: '2% 0% 0% 5%', height: '60px' }} /><br />
                <Profile userName={user.firstName + ' ' + user.lastName} />
            </div>
            {props.children}
        </>
    );
}