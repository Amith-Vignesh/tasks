// UserDetails.js

// import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './UserDetails.css';

const UserDetails = () => {
  const location = useLocation();
  const { user, allUsers, orgData } = location.state || {};

  if (!user && !allUsers) {
    return <div>No user data available</div>;
  }

  return (
    <div className="user-details-container">
      {Array.isArray(allUsers) ? (<h1>Welcome Admin</h1>) : ''}
      

      <h2>User Details</h2>
     
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th> 
            <th>Address</th>
            <th>Org ID</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(allUsers) ? (
            // Display all users for admin
            allUsers.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>  
                <td>{u.username}</td>  
                <td>{u.email}</td> 
                <td>{u.age}</td> 
                <td>{u.gender}</td> 
                <td>{u.address}</td>
                <td>{u.orgId}</td>
              </tr>
            ))
          ) : (
            // Display only the current user for other user types
            <tr>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td> 
                <td>{user.age}</td> 
                <td>{user.gender}</td> 
                <td>{user.address}</td>
                <td>{user.orgId}</td>
            </tr>
          )}
        </tbody>
      </table>
            
      {Array.isArray(orgData) && (
        <div>
          <h2>Organization Details</h2>
          <table>
            <thead>
              <tr>
                <th>Org ID</th>
                <th>Org Name</th>
                <th>Org Address</th>
              </tr>
            </thead>
            <tbody>
              {orgData.map(org => (
                <tr key={org.orgid}>
                  <td>{org.orgid}</td>
                  <td>{org.orgName}</td>
                  <td>{org.orgaddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
      )}

    </div>
  );
};

export default UserDetails;
