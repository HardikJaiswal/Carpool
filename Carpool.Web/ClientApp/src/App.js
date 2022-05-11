import './App.css';
import './Dashboard/Dashboard.css';
import { Route, Routes } from 'react-router-dom';
import SignIn from './Authentication/SignIn';
import Dashboard from './Dashboard/Dashboard';
import RequiresAuth from './Authentication/RequiresAuth';
import BookRide from './BookRide/BookRide';
import OfferRide from './OfferRide/OfferRide';
import History from './History/History';
import ProfileDetails from './Profile/ProfileDetails';

export default function App() {

    return (
        <Routes>
            <Route path='/' element={<RequiresAuth><Dashboard /></RequiresAuth>} />
            <Route path='/bookride' element={<RequiresAuth><BookRide /></RequiresAuth>} />
            <Route path='/offerride' element={<RequiresAuth><OfferRide /></RequiresAuth>} />
            <Route path='/history' element={<RequiresAuth><History /></RequiresAuth>} />
            <Route path='/profile' element={<RequiresAuth><ProfileDetails /></RequiresAuth>} />
            <Route path='/login' element={<SignIn />} />
        </Routes>
    );
}