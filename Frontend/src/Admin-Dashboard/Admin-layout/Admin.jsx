import React, { useState, useEffect } from 'react';
import LoginForm from '../AdminLoginForm';
import AdminLayout from './AdminLayout';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('adminToken'));

  const handleLoginSuccess = () => {
    localStorage.setItem('adminToken', localStorage.getItem('adminToken')); // Set token on successful login
    setIsAuthenticated(true);
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <AdminLayout />
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}
