
import React, { createContext, useContext, useState, useEffect } from 'react';

interface StudentContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  username: string | null;
  studentId: string | null;
  expiryDate: string | null;
}

const StudentContext = createContext<StudentContextType>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
  username: null,
  studentId: null,
  expiryDate: null,
});

export const useStudent = () => useContext(StudentContext);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [expiryDate, setExpiryDate] = useState<string | null>(null);

  // Check localStorage on mount
  useEffect(() => {
    const studentData = localStorage.getItem('studentData');
    if (studentData) {
      const { username, studentId, expiryDate } = JSON.parse(studentData);
      setIsAuthenticated(true);
      setUsername(username);
      setStudentId(studentId);
      setExpiryDate(expiryDate);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    // Simple authentication - in a real app, this would validate against a backend
    // For demo, we'll use student/student123
    if (username === 'student' && password === 'student123') {
      const studentId = 'ST' + Math.floor(1000 + Math.random() * 9000);
      const expiryDate = null; // No active subscription initially
      
      setIsAuthenticated(true);
      setUsername(username);
      setStudentId(studentId);
      setExpiryDate(expiryDate);
      
      localStorage.setItem('studentData', JSON.stringify({ username, studentId, expiryDate }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    setStudentId(null);
    setExpiryDate(null);
    localStorage.removeItem('studentData');
  };

  return (
    <StudentContext.Provider value={{ isAuthenticated, login, logout, username, studentId, expiryDate }}>
      {children}
    </StudentContext.Provider>
  );
};
