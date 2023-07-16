// Dashboard.js
import React from 'react';
import Books from './Books';
import Authors from './Authors';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="card">
        <h2 className="card-title">Books</h2>
        <Books />
      </div>
      <div className="card">
        <h2 className="card-title">Authors</h2>
        <Authors />
      </div>
    </div>
  );
}

export default Dashboard;
