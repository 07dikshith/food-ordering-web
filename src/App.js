import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Client from './pages/Client';
import Admin from './pages/Admin';
import './styles/styles.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/client" element={<Client />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <ToastContainer position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;