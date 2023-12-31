// Login.js
import axios from 'axios';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Implement authentication logic (e.g., make an API request to your backend)
    console.log('Email:', email);
    console.log('Password:', password);
    try {
        const response = await axios.post('http://localhost:3000/members/login', { email, password });
        console.log('Login successful:', response.data);
        window.localStorage.setItem('memberId', response.data.memberId)
        window.localStorage.setItem('token', response.data.token)
        navigate('/')

        // Redirect or update state based on successful login
      } catch (error) {
        console.error('Login failed:', error.message);
        // Handle login error, display a message, etc.
      }
    
      // Clear form fields after submission
      setEmail('');
      setPassword('');
  };

  return (
    <div className="container mt-5"> {/* Use Bootstrap container class */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
