
import React from 'react';
import { User, Award, Bookmark, Settings, LogOut } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const ProfilePage = () => {
  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm">
        <h1 className="text-xl font-bold flex items-center justify-center gap-2">
          <User size={20} className="text-blue-500" />
          My Profile
        </h1>
      </header>

      {/* Profile Info */}
      <div className="p-4">
        <div className="bg-white rounded-xl border p-6 text-center">
          <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
            <User size={40} className="text-blue-500" />
          </div>
          <h2 className="text-xl font-bold mt-4">Alex Johnson</h2>
          <p className="text-gray-500">Student</p>
          <p className="text-sm text-blue-500 mt-1">alex.j@example.com</p>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-2xl">3</h3>
              <p className="text-sm text-gray-500">Courses</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-2xl">2</h3>
              <p className="text-sm text-gray-500">Certificates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">My Progress</h2>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Total Points</h3>
            <span className="text-xl font-bold text-orange-500">680</span>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Overall Completion</span>
              <span>35%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: "35%" }} />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Quiz Average</span>
              <span>80%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: "80%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Account</h2>
        <div className="bg-white rounded-xl border overflow-hidden">
          <button className="flex items-center gap-3 p-4 w-full text-left border-b">
            <Award size={20} className="text-blue-500" />
            <span>My Achievements</span>
          </button>
          <button className="flex items-center gap-3 p-4 w-full text-left border-b">
            <Bookmark size={20} className="text-orange-500" />
            <span>Saved Content</span>
          </button>
          <button className="flex items-center gap-3 p-4 w-full text-left border-b">
            <Settings size={20} className="text-gray-500" />
            <span>Settings</span>
          </button>
          <button className="flex items-center gap-3 p-4 w-full text-left text-red-500">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ProfilePage;
