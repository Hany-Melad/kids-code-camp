
import React from 'react';
import { CheckCircle, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuizCardProps {
  id: number;
  title: string;
  courseTitle: string;
  questionCount: number;
  completed: boolean;
  score?: number;
}

const QuizCard = ({
  id,
  title,
  courseTitle,
  questionCount,
  completed,
  score,
}: QuizCardProps) => {
  return (
    <Link 
      to={`/quiz/${id}`} 
      className="block bg-white rounded-xl border p-4 mb-3 transition-all duration-200 hover:shadow"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold">{title}</h3>
          <div className="flex items-center gap-1 mt-1">
            <BookOpen size={14} className="text-gray-500" />
            <span className="text-sm text-gray-500">{courseTitle}</span>
          </div>
        </div>
        {completed ? (
          <div className="flex items-center gap-1 bg-green-100 text-green-600 px-2 py-1 rounded-full">
            <CheckCircle size={14} />
            <span className="text-xs font-medium">Completed</span>
          </div>
        ) : (
          <div className="bg-orange-100 text-orange-500 px-2 py-1 rounded-full text-xs font-medium">
            {questionCount} Questions
          </div>
        )}
      </div>
      
      {completed && score !== undefined && (
        <div className="mt-3">
          <div className="flex justify-between text-sm mb-1">
            <span>Score</span>
            <span className="font-medium">{score}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500" 
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      )}
      
      {!completed && (
        <button className="mt-3 w-full bg-blue-500 text-white rounded-lg py-2 font-medium transition-colors hover:bg-blue-600">
          Start Quiz
        </button>
      )}
    </Link>
  );
};

export default QuizCard;
