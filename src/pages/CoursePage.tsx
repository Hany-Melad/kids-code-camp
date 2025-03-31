
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, BookOpen, List, Lock, Eye, EyeOff } from 'lucide-react';
import VideoCard from '@/components/VideoCard';
import ProgressBar from '@/components/ProgressBar';
import BottomNav from '@/components/BottomNav';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

// Mock data for a specific course
const courseData = {
  id: 1,
  title: "Python for Beginners",
  description: "Learn the basics of Python programming with fun exercises and practical examples suitable for young programmers. Start your coding journey today!",
  progress: 60,
  totalLessons: 10,
  completedLessons: 6,
  password: "python123", // Course password
  imageUrl: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80",
  videos: [
    {
      id: 1,
      title: "Introduction to Python and Setting Up",
      duration: "12:30",
      thumbnail: "https://img.youtube.com/vi/kqtD5dpn9C8/maxresdefault.jpg",
      completed: true,
      videoUrl: "https://www.youtube.com/watch?v=kqtD5dpn9C8",
      password: "lesson1" // Individual lesson password
    },
    {
      id: 2,
      title: "Variables and Data Types",
      duration: "15:45",
      thumbnail: "https://img.youtube.com/vi/TEqHRhKj0ds/maxresdefault.jpg", 
      completed: true,
      videoUrl: "https://www.youtube.com/watch?v=TEqHRhKj0ds",
      password: "lesson2"
    },
    {
      id: 3,
      title: "Conditional Statements: If, Else, and Elif",
      duration: "18:20",
      thumbnail: "https://img.youtube.com/vi/AWek49wXGzI/maxresdefault.jpg",
      completed: true,
      videoUrl: "https://www.youtube.com/watch?v=AWek49wXGzI",
      password: "lesson3"
    },
    {
      id: 4,
      title: "Loops in Python: For and While",
      duration: "20:15",
      thumbnail: "https://img.youtube.com/vi/94UHCEmprCY/maxresdefault.jpg",
      completed: false,
      videoUrl: "https://www.youtube.com/watch?v=94UHCEmprCY",
      password: "lesson4"
    },
    {
      id: 5,
      title: "Functions and Parameters",
      duration: "22:30",
      thumbnail: "https://img.youtube.com/vi/l26oaHV7D40/maxresdefault.jpg",
      completed: false,
      videoUrl: "https://www.youtube.com/watch?v=l26oaHV7D40",
      password: "lesson5"
    }
  ]
};

const CoursePage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedVideo, setSelectedVideo] = useState<null | {
    title: string;
    videoUrl: string;
  }>(null);
  const [isCourseUnlocked, setIsCourseUnlocked] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentVideoId, setCurrentVideoId] = useState<number | null>(null);
  const [unlockType, setUnlockType] = useState<"course" | "lesson">("course");
  const [showPassword, setShowPassword] = useState(false);

  // In a real app, you would fetch course data based on the ID
  // For this example we'll use the mock data

  const handlePlayVideo = (videoId: number) => {
    // If the course is not unlocked, show the course password dialog
    if (!isCourseUnlocked) {
      setUnlockType("course");
      setIsPasswordDialogOpen(true);
      setCurrentVideoId(videoId);
      return;
    }

    // If course is unlocked but the lesson needs its own password
    const video = courseData.videos.find(v => v.id === videoId);
    if (video) {
      // Check if this specific video is already unlocked in session storage
      const unlockedVideos = JSON.parse(sessionStorage.getItem('unlockedVideos') || '[]');
      if (unlockedVideos.includes(videoId)) {
        setSelectedVideo({ title: video.title, videoUrl: video.videoUrl });
      } else {
        setUnlockType("lesson");
        setCurrentVideoId(videoId);
        setIsPasswordDialogOpen(true);
      }
    }
  };

  const handleUnlock = () => {
    if (unlockType === "course") {
      if (currentPassword === courseData.password) {
        setIsCourseUnlocked(true);
        setIsPasswordDialogOpen(false);
        toast.success("Course unlocked successfully!");
        
        // If there was a video selected, handle it now
        if (currentVideoId !== null) {
          handlePlayVideo(currentVideoId);
        }
      } else {
        toast.error("Incorrect course password!");
      }
    } else {
      // Lesson unlock
      const video = courseData.videos.find(v => v.id === currentVideoId);
      if (video && currentPassword === video.password) {
        // Store unlocked video ID in session storage
        const unlockedVideos = JSON.parse(sessionStorage.getItem('unlockedVideos') || '[]');
        if (!unlockedVideos.includes(currentVideoId)) {
          unlockedVideos.push(currentVideoId);
          sessionStorage.setItem('unlockedVideos', JSON.stringify(unlockedVideos));
        }
        
        setIsPasswordDialogOpen(false);
        setSelectedVideo({ title: video.title, videoUrl: video.videoUrl });
        toast.success("Lesson unlocked successfully!");
      } else {
        toast.error("Incorrect lesson password!");
      }
    }
    setCurrentPassword("");
    setShowPassword(false);
  };

  const closeVideoPlayer = () => {
    setSelectedVideo(null);
  };

  const extractYouTubeID = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : '';
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm flex items-center">
        <Link to="/" className="text-gray-500 mr-2">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold">Course Details</h1>
      </header>

      {/* Course Banner */}
      <div className="relative">
        <div className="h-48 bg-blue-500 overflow-hidden">
          {courseData.imageUrl ? (
            <img 
              src={courseData.imageUrl} 
              alt={courseData.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen size={64} className="text-blue-300" />
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
          <h2 className="text-white text-2xl font-bold">{courseData.title}</h2>
          <div className="flex items-center gap-2 text-white mt-2">
            <div className="bg-white/20 px-2 py-1 rounded text-xs">
              {courseData.totalLessons} lessons
            </div>
            <div className="text-xs">
              {courseData.completedLessons} completed
            </div>
            {!isCourseUnlocked && (
              <div className="bg-orange-500 px-2 py-1 rounded-full text-xs flex items-center">
                <Lock size={12} className="mr-1" />
                Locked
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="p-4 bg-white shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Course Progress</span>
          <span className="text-sm text-orange-500 font-medium">{courseData.progress}%</span>
        </div>
        <ProgressBar progress={courseData.progress} />
      </div>

      {/* Description */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">About this Course</h3>
        <p className="text-gray-600">{courseData.description}</p>
        
        {!isCourseUnlocked && (
          <Button 
            onClick={() => {
              setUnlockType("course");
              setIsPasswordDialogOpen(true);
            }}
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white w-full flex items-center justify-center gap-2"
          >
            <Lock size={16} />
            Unlock Course
          </Button>
        )}
      </div>

      {/* Video List */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
          <Play size={18} />
          Course Videos
          {!isCourseUnlocked && <Lock size={14} className="text-orange-500" />}
        </h3>

        <div className="space-y-3">
          {courseData.videos.map((video) => (
            <VideoCard 
              key={video.id}
              {...video}
              onPlay={() => handlePlayVideo(video.id)}
              isLocked={!isCourseUnlocked}
            />
          ))}
        </div>
      </div>
      
      {/* Next Quiz Button */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
          <List size={18} />
          Assessments
        </h3>
        
        <Link to={`/quiz/${id}`} className={`block ${isCourseUnlocked ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'} text-white rounded-xl p-4 text-center font-medium transition-colors`}>
          {isCourseUnlocked ? 'Take Course Quiz' : 'Unlock Course to Access Quiz'}
        </Link>
      </div>

      {/* Password Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{unlockType === "course" ? "Unlock Course" : "Unlock Lesson"}</DialogTitle>
            <DialogDescription>
              Enter the password to {unlockType === "course" ? "access this course" : "view this lesson"}.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="relative w-full">
              <Input
                type={showPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter password"
                className="pr-10"
              />
              <button 
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="secondary" 
              onClick={() => {
                setIsPasswordDialogOpen(false);
                setCurrentPassword("");
                setShowPassword(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleUnlock}>Unlock</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col">
          <div className="p-4 text-white flex justify-between items-center">
            <h3 className="font-medium">{selectedVideo.title}</h3>
            <button onClick={closeVideoPlayer} className="p-2">
              Close
            </button>
          </div>
          <div className="flex-grow flex items-center justify-center p-4">
            <iframe
              className="w-full max-w-3xl aspect-video rounded-lg"
              src={`https://www.youtube.com/embed/${extractYouTubeID(selectedVideo.videoUrl)}`}
              title={selectedVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default CoursePage;
