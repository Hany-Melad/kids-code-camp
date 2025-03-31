
import React from 'react';
import { Play, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  id: number;
  title: string;
  description: string;
  progress: number;
  imageUrl?: string;
  totalLessons: number;
  completedLessons: number;
}

const CourseCard = ({
  id,
  title,
  description,
  progress,
  imageUrl,
  totalLessons,
  completedLessons,
}: CourseCardProps) => {
  return (
    <Link to={`/course/${id}`} className="course-card bg-white block">
      <div className="relative">
        <div className="h-40 bg-blue-100 overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen size={48} className="text-blue-300" />
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <div 
            className="h-full bg-orange-500" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="text-xs text-gray-500">
            {completedLessons}/{totalLessons} lessons
          </div>
          <div className="flex items-center gap-1 bg-orange-100 text-orange-500 rounded-full px-3 py-1">
            <Play size={14} />
            <span className="text-xs font-medium">Continue</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
