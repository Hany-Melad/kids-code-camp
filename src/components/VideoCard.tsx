
import React from 'react';
import { Play, Check, Clock, Lock } from 'lucide-react';

interface VideoCardProps {
  id: number;
  title: string;
  duration: string;
  thumbnail: string;
  completed: boolean;
  videoUrl: string;
  onPlay: () => void;
  isLocked?: boolean;
}

const VideoCard = ({
  id,
  title,
  duration,
  thumbnail,
  completed,
  videoUrl,
  onPlay,
  isLocked = false,
}: VideoCardProps) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border mb-3">
      <div className="relative" onClick={onPlay}>
        <div className="h-40 bg-gray-200 relative overflow-hidden">
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
              {isLocked ? (
                <Lock size={24} className="text-orange-500" />
              ) : (
                <Play size={24} className="text-orange-500 ml-1" />
              )}
            </div>
          </div>
        </div>
        {completed && !isLocked && (
          <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
            <Check size={16} />
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-medium line-clamp-2">{title}</h3>
        <div className="flex items-center gap-1 mt-2 text-gray-500">
          <Clock size={14} />
          <span className="text-xs">{duration}</span>
        </div>
        <button
          onClick={onPlay}
          className={`mt-3 w-full ${
            isLocked 
              ? 'bg-gray-200 text-gray-700 flex items-center justify-center gap-1' 
              : 'bg-orange-500 text-white hover:bg-orange-600'
          } rounded-lg py-2 font-medium transition-colors`}
        >
          {isLocked ? (
            <>
              <Lock size={14} />
              Unlock Lesson
            </>
          ) : (
            completed ? "Watch Again" : "Continue Watching"
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
