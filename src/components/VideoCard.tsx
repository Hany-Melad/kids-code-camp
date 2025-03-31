
import React, { useState } from 'react';
import { Play, Check, Clock, Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface VideoCardProps {
  id: number;
  title: string;
  duration: string;
  thumbnail: string;
  completed: boolean;
  videoUrl: string;
  onPlay: () => void;
  isLocked?: boolean;
  password?: string;
  onUnlock?: (id: number, password: string) => boolean;
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
  password = '',
  onUnlock,
}: VideoCardProps) => {
  const [enteredPassword, setEnteredPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleUnlock = () => {
    if (onUnlock && onUnlock(id, enteredPassword)) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleUnlock();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border mb-3">
      <div className="relative" onClick={isLocked ? undefined : onPlay}>
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

        {isLocked ? (
          <div className="mt-3 space-y-2">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={enteredPassword}
                onChange={(e) => {
                  setEnteredPassword(e.target.value);
                  setPasswordError(false);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Enter password"
                className={`pr-10 ${passwordError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">Incorrect password</p>
            )}
            <Button
              onClick={handleUnlock}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Lock size={14} className="mr-1" />
              Unlock Lesson
            </Button>
          </div>
        ) : (
          <button
            onClick={onPlay}
            className="mt-3 w-full bg-orange-500 text-white hover:bg-orange-600 rounded-lg py-2 font-medium transition-colors"
          >
            {completed ? "Watch Again" : "Continue Watching"}
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
