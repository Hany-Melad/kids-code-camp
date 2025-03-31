
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, BookOpen, List } from 'lucide-react';
import VideoCard from '@/components/VideoCard';
import ProgressBar from '@/components/ProgressBar';
import BottomNav from '@/components/BottomNav';

// Mock data for a specific course
const courseData = {
  id: 1,
  title: "Python for Beginners",
  description: "Learn the basics of Python programming with fun exercises and practical examples suitable for young programmers. Start your coding journey today!",
  progress: 60,
  totalLessons: 10,
  completedLessons: 6,
  imageUrl: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80",
  videos: [
    {
      id: 1,
      title: "Introduction to Python and Setting Up",
      duration: "12:30",
      thumbnail: "https://img.youtube.com/vi/kqtD5dpn9C8/maxresdefault.jpg",
      completed: true,
      videoUrl: "https://www.youtube.com/watch?v=kqtD5dpn9C8"
    },
    {
      id: 2,
      title: "Variables and Data Types",
      duration: "15:45",
      thumbnail: "https://img.youtube.com/vi/TEqHRhKj0ds/maxresdefault.jpg", 
      completed: true,
      videoUrl: "https://www.youtube.com/watch?v=TEqHRhKj0ds"
    },
    {
      id: 3,
      title: "Conditional Statements: If, Else, and Elif",
      duration: "18:20",
      thumbnail: "https://img.youtube.com/vi/AWek49wXGzI/maxresdefault.jpg",
      completed: true,
      videoUrl: "https://www.youtube.com/watch?v=AWek49wXGzI"
    },
    {
      id: 4,
      title: "Loops in Python: For and While",
      duration: "20:15",
      thumbnail: "https://img.youtube.com/vi/94UHCEmprCY/maxresdefault.jpg",
      completed: false,
      videoUrl: "https://www.youtube.com/watch?v=94UHCEmprCY"
    },
    {
      id: 5,
      title: "Functions and Parameters",
      duration: "22:30",
      thumbnail: "https://img.youtube.com/vi/l26oaHV7D40/maxresdefault.jpg",
      completed: false,
      videoUrl: "https://www.youtube.com/watch?v=l26oaHV7D40"
    }
  ]
};

const CoursePage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedVideo, setSelectedVideo] = useState<null | {
    title: string;
    videoUrl: string;
  }>(null);

  // In a real app, you would fetch course data based on the ID
  // For this example we'll use the mock data

  const handlePlayVideo = (title: string, videoUrl: string) => {
    setSelectedVideo({ title, videoUrl });
  };

  const closeVideoPlayer = () => {
    setSelectedVideo(null);
  };

  const extractYouTubeID = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : '';
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
      </div>

      {/* Video List */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
          <Play size={18} />
          Course Videos
        </h3>

        <div className="space-y-3">
          {courseData.videos.map((video) => (
            <VideoCard 
              key={video.id}
              {...video}
              onPlay={() => handlePlayVideo(video.title, video.videoUrl)}
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
        
        <Link to={`/quiz/${id}`} className="block bg-blue-500 text-white rounded-xl p-4 text-center font-medium transition-colors hover:bg-blue-600">
          Take Course Quiz
        </Link>
      </div>

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
