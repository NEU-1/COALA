import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/core.css';
import App from './components/App';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
// axios.defaults.baseURL = "http://192.168.100.129:9999/api/member"
// axios.defaults.withCredentials = true;