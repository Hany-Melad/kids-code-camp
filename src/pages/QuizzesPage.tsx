
import React from 'react';
import { List, CheckCircle, XCircle } from 'lucide-react';
import QuizCard from '@/components/QuizCard';
import BottomNav from '@/components/BottomNav';

// Mock data for quizzes
const quizzes = [
  {
    id: 1,
    title: "Python Basics Quiz",
    courseTitle: "Python for Beginners",
    questionCount: 10,
    completed: true,
    score: 80
  },
  {
    id: 2,
    title: "HTML Fundamentals",
    courseTitle: "Web Development Basics",
    questionCount: 8,
    completed: false
  },
  {
    id: 3,
    title: "Scratch Game Development",
    courseTitle: "Game Development with Scratch",
    questionCount: 12,
    completed: false
  }
];

const QuizzesPage = () => {
  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm">
        <h1 className="text-xl font-bold flex items-center justify-center gap-2">
          <List size={20} className="text-blue-500" />
          Quizzes
        </h1>
      </header>

      {/* Stats */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle size={24} className="text-green-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">1</h3>
                <p className="text-sm text-gray-500">Completed</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <XCircle size={24} className="text-orange-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">2</h3>
                <p className="text-sm text-gray-500">Pending</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quizzes */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Available Quizzes</h2>
        
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} {...quiz} />
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default QuizzesPage;
