import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <>
      <Login />
    </>
  );
};

export default LoginPage;