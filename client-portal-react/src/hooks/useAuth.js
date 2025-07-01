import { useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
    setIsLoading(false);

    // Listen for auth changes
    const handleAuthChange = (user) => {
      setUser(user);
      setIsAuthenticated(!!user);
    };

    authService.onAuthChange(handleAuthChange);

    // Cleanup
    return () => {
      authService.offAuthChange(handleAuthChange);
    };
  }, []);

  const login = async (credentials) => {
    setIsLoading(true);
    const result = await authService.login(credentials);
    setIsLoading(false);
    return result;
  };

  const logout = () => {
    authService.logout();
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout
  };
};