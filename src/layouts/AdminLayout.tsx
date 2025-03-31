
import React, { useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { 
  Users, 
  BookOpen, 
  Home, 
  Award, 
  CreditCard, 
  CircleHelp,
  LogOut
} from 'lucide-react';

const AdminLayout = () => {
  const { isAuthenticated, logout, username } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-orange-500">Admin Panel</h2>
          <p className="text-sm text-gray-500">Welcome, {username}</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link to="/admin" className="flex items-center gap-2 p-2 rounded hover:bg-orange-50 text-gray-700 hover:text-orange-500">
                <Home size={18} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/courses" className="flex items-center gap-2 p-2 rounded hover:bg-orange-50 text-gray-700 hover:text-orange-500">
                <BookOpen size={18} />
                <span>Courses</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/students" className="flex items-center gap-2 p-2 rounded hover:bg-orange-50 text-gray-700 hover:text-orange-500">
                <Users size={18} />
                <span>Students</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/quizzes" className="flex items-center gap-2 p-2 rounded hover:bg-orange-50 text-gray-700 hover:text-orange-500">
                <CircleHelp size={18} />
                <span>Quizzes</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/payments" className="flex items-center gap-2 p-2 rounded hover:bg-orange-50 text-gray-700 hover:text-orange-500">
                <CreditCard size={18} />
                <span>Payments</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/certificates" className="flex items-center gap-2 p-2 rounded hover:bg-orange-50 text-gray-700 hover:text-orange-500">
                <Award size={18} />
                <span>Certificates</span>
              </Link>
            </li>
            <li>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 p-2 rounded hover:bg-orange-50 text-gray-700 hover:text-orange-500 w-full text-left"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Admin Control Panel</h1>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
