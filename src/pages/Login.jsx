import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('client');
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username && formData.password) {
      // Mock authentication - in real app, this would validate against a backend
      if (activeTab === 'client') {
        navigate('/client');
      } else {
        navigate('/admin');
      }
      toast.success('Login successful!');
    } else {
      toast.error('Please fill in all fields');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="login-container">
      <div className={`login-section ${activeTab === 'client' ? 'active' : ''}`}>
        <div className="login-content">
          <h2>Client Login</h2>
          <div className="tab-buttons">
            <button
              className={activeTab === 'client' ? 'active' : ''}
              onClick={() => setActiveTab('client')}
            >
              Client
            </button>
            <button
              className={activeTab === 'admin' ? 'active' : ''}
              onClick={() => setActiveTab('admin')}
            >
              Admin
            </button>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="login-button">
              Login as {activeTab === 'client' ? 'Client' : 'Admin'}
            </button>
          </form>
        </div>
      </div>
      <div className={`login-section ${activeTab === 'admin' ? 'active' : ''}`}>
        <div className="login-image"></div>
      </div>
    </div>
  );
};

export default Login;