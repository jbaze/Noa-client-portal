 
import React from 'react';
import LoginForm from './LoginForm';

const LoginPage = ({ onLoginSuccess }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-purple-800 flex items-center justify-center p-4">
      <LoginForm onLoginSuccess={onLoginSuccess} />
    </div>
  );
};

export default LoginPage;