import './Dashboard/Dashboard.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './Authentication/SignIn.tsx';
import Dashboard from './Dashboard/Dashboard.tsx';
import BookRide from './BookRide/BookRide.tsx';
import OfferRide from './OfferRide/OfferRide.tsx';
import History from './History/History.tsx';
import ProfileDetails from './Profile/ProfileDetails.tsx';
import * as React from 'react';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        id : 0
    }
    render(){
        return (
            <Routes>
                <Route path='/login' element={<SignIn onSuccess={(val) => this.setState({id: val})} />} />
                <Route path='/' element={this.state.id != 0 ? <Dashboard /> : <Navigate to="/login" replace={true} />} />
                <Route path='/bookride' element={this.state.id != 0 ? <BookRide /> : <Navigate to="/login" replace={true} />} />
                <Route path='/offerride' element={this.state.id != 0 ? <OfferRide /> : <Navigate to="/login" replace={true} />} />
                <Route path='/history' element={this.state.id != 0 ? <History /> : <Navigate to="/login" replace={true} />} />
                <Route path='/profile' element={this.state.id != 0 ? <ProfileDetails /> : <Navigate to="/login" replace={true} />} />
            </Routes>
        );
    }
}