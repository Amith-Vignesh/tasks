// Signup.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';



const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        username,
        password,
        age,
        gender,
        address,
        email,
        organization,
      });
      console.log('Signed up:', response.data);
      alert('Signup successful! Redirecting to Login Page...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    } catch (error) {
      console.error('Signup failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />

      <label htmlFor="password">Password</label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <label htmlFor="age">Age</label>
      <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} />

      <div className="gender-radio">
        <label>
          <input type="radio" name="gender" value="male" onChange={() => setGender('male')} />
          Male
        </label>
        <label>
          <input type="radio" name="gender" value="female" onChange={() => setGender('female')} />
          Female
        </label>
      </div>

      <label htmlFor="address">Address</label>
      <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />

      <label htmlFor="email">Email</label>
      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label htmlFor="organization">Organization</label>
      <select id="organization" value={organization} onChange={(e) => setOrganization(e.target.value)}>
        <option value="1">Company A</option>
        <option value="2">Company B</option>
        <option value="3">Company C</option>
      </select>

      <button onClick={handleSignup}>Signup</button>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
