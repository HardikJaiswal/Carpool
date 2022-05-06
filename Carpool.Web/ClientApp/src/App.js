import react from 'react';
import './App.css';
import GeneralHome from './General-Homepage/GeneralHome';
import UserHome from './User-Homepage/UserHome';
import Profile from './User-Homepage/Profile';
import History from './User-Homepage/History';
import { Route, Routes } from 'react-router-dom';

export default class App extends react.Component {
    render() {
        return (
            <Routes>
                <Route exact path='/' element={<GeneralHome />} />
                <Route path='/user-home' element={
                    <UserHome>
                        <Route path='/history' element={<History />} />
                        <Route path='/history' element={<Profile />} />
                    </UserHome>
                } />
            </Routes>
        );
    }
}