
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { Play, Heart, Share, BookOpen, ArrowLeft } from 'lucide-react';

const MOCK_VIDEOS = [
  {
    id: '1',
    title: 'React Hooks Explained in 60 Seconds',
    instructor: 'Sarah Johnson',
    courseId: '1',
    courseName: 'React Fundamentals',
    thumbnail: '/api/placeholder/400/600',
    likes: 1234,
    isLiked: false
  },
  {
    id: '2',
    title: 'JavaScript Array Methods You Must Know',
    instructor: 'Mike Chen',
    courseId: '2',
    courseName: 'Advanced JavaScript',
    thumbnail: '/api/placeholder/400/600',
    likes: 2156,
    isLiked: true
  },
  {
    id: '3',
    title: 'Color Theory for Beginners',
    instructor: 'Emily Davis',
    courseId: '3',
    courseName: 'UI/UX Design Masterclass',
    thumbnail: '/api/placeholder/400/600',
    likes: 987,
    isLiked: false
  }
];

const VideoFeed = () => {
  const [videos, setVideos] = useState(MOCK_VIDEOS);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleLike = (videoId: string) => {
    setVideos(videos.map(video => 
      video.id === videoId 
        ? { 
            ...video, 
            isLiked: !video.isLiked,
            likes: video.isLiked ? video.likes - 1 : video.likes + 1
          }
        : video
    ));
  };

  const currentVideo = videos[currentVideoIndex];

  return (
    <div className="min-h-screen bg-black">
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center justify-between p-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center space-x-2 text-white">
            <BookOpen className="h-6 w-6" />
            <span className="font-bold text-lg">Learnify</span>
          </div>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="relative h-screen overflow-hidden">
        {/* Video Container */}
        <div className="relative h-full flex items-center justify-center bg-gray-900">
          <img
            src={currentVideo.thumbnail}
            alt={currentVideo.title}
            className="h-full w-auto object-cover"
          />
          
          {/* Play Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              size="lg"
              className="rounded-full w-20 h-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
            >
              <Play className="h-8 w-8 text-white" />
            </Button>
          </div>

          {/* Video Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
            <div className="flex justify-between items-end">
              <div className="flex-1 mr-4">
                <h2 className="text-xl font-bold mb-2">{currentVideo.title}</h2>
                <p className="text-white/80 mb-2">by {currentVideo.instructor}</p>
                <Link to={`/course/${currentVideo.courseId}`}>
                  <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Full Course
                  </Button>
                </Link>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-4">
                <Button
                  variant="ghost"
                  size="lg"
                  className="rounded-full w-14 h-14 p-0 hover:bg-white/20"
                  onClick={() => handleLike(currentVideo.id)}
                >
                  <Heart
                    className={`h-6 w-6 ${
                      currentVideo.isLiked ? 'fill-red-500 text-red-500' : 'text-white'
                    }`}
                  />
                </Button>
                <div className="text-center text-sm text-white/80">
                  {currentVideo.likes}
                </div>

                <Button
                  variant="ghost"
                  size="lg"
                  className="rounded-full w-14 h-14 p-0 hover:bg-white/20"
                >
                  <Share className="h-6 w-6 text-white" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Navigation */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 space-y-2">
          {videos.map((video, index) => (
            <Button
              key={video.id}
              variant="ghost"
              size="sm"
              className={`w-12 h-12 rounded-full p-0 ${
                index === currentVideoIndex 
                  ? 'bg-white/30 text-white' 
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
              onClick={() => setCurrentVideoIndex(index)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>

      {/* Video Navigation Dots */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {videos.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
              index === currentVideoIndex ? 'bg-white' : 'bg-white/40'
            }`}
            onClick={() => setCurrentVideoIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoFeed;
