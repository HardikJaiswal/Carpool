import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { AuthProvider } from './Authentication/Auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <AuthProvider >
            <App />
        </AuthProvider>
    </BrowserRouter>
);

registerServiceWorker();