
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  username: string | null;
}

const AdminContext = createContext<AdminContextType>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
  username: null,
});

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);

  // Check localStorage on mount
  useEffect(() => {
    const adminData = localStorage.getItem('adminData');
    if (adminData) {
      const { username } = JSON.parse(adminData);
      setIsAuthenticated(true);
      setUsername(username);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    // Simple authentication - in a real app, this would validate against a backend
    // For demo, we'll use a hardcoded admin/admin123
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      setUsername(username);
      localStorage.setItem('adminData', JSON.stringify({ username }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    localStorage.removeItem('adminData');
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout, username }}>
      {children}
    </AdminContext.Provider>
  );
};
