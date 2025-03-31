
import React from 'react';
import { BookOpen, Award, ArrowRight } from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import ProgressBar from '@/components/ProgressBar';
import BottomNav from '@/components/BottomNav';
import { Link } from 'react-router-dom';

// Mock data for courses
const courses = [
  {
    id: 1,
    title: "Python for Beginners",
    description: "Learn the basics of Python programming with fun exercises",
    progress: 60,
    totalLessons: 10,
    completedLessons: 6,
    imageUrl: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80"
  },
  {
    id: 2,
    title: "Web Development Basics",
    description: "HTML, CSS and JavaScript fundamentals for kids",
    progress: 30,
    totalLessons: 12,
    completedLessons: 4,
    imageUrl: "https://images.unsplash.com/photo-1579403124614-197f69d8187b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2564&q=80"
  },
  {
    id: 3,
    title: "Game Development with Scratch",
    description: "Create your first games using Scratch programming",
    progress: 10,
    totalLessons: 8,
    completedLessons: 1
  }
];

const HomePage = () => {
  // Overall progress calculation
  const totalLessons = courses.reduce((sum, course) => sum + course.totalLessons, 0);
  const completedLessons = courses.reduce((sum, course) => sum + course.completedLessons, 0);
  const overallProgress = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-bold text-center">Kids Coding Academy</h1>
      </header>

      {/* Welcome Section */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-xl p-4 shadow-md">
          <h2 className="text-xl font-bold">Welcome back, Alex!</h2>
          <p className="mt-1 text-orange-50">Continue your coding journey</p>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Overall Progress</span>
              <span>{overallProgress}%</span>
            </div>
            <ProgressBar progress={overallProgress} className="bg-orange-200" />
          </div>
        </div>
      </div>

      {/* My Courses Section */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <BookOpen size={18} />
            My Courses
          </h2>
          <Link to="/courses" className="text-orange-500 text-sm flex items-center">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Award size={18} />
            Recent Achievements
          </h2>
          <Link to="/certificates" className="text-orange-500 text-sm flex items-center">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="bg-white rounded-xl p-4 border">
          <div className="flex items-center justify-center py-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto">
                <Award size={32} className="text-orange-500" />
              </div>
              <h3 className="mt-3 font-bold">Python Basics</h3>
              <p className="text-sm text-gray-500">Complete 3 more lessons to earn this certificate</p>
              <button className="mt-3 bg-blue-500 text-white rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-blue-600">
                Continue Learning
              </button>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default HomePage;
