import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('mm_token');
    navigate('/auth/login');
  };

  return (
    <div className="container" style={{ padding: '28px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>
      <div className="admin-links" style={{ marginTop: 12 }}>
        <Link to="/admin/projects" className="btn">Manage Projects</Link>
        <Link to="/admin/faqs" className="btn">Manage FAQs</Link>
        <Link to="/admin/reviews" className="btn">Manage Reviews</Link>
        <Link to="/admin/slider" className="btn">Manage Home Slider</Link>
      </div>
    </div>
  );
}