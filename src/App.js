// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import UserDetails from './components/UserDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route: Login */}
        <Route path="/" element={<Login />} />

        {/* Route for Login */}
        <Route path="/login" element={<Login />} />

        {/* Route for Signup */}
        <Route path="/signup" element={<Signup />} />

        {/* Route for UserDetails */}
        <Route path="/user-details" element={<UserDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
