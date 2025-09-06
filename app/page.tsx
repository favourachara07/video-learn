'use client';

import { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import AddVideoForm from './components/AddVideoForm';
import VideoList from './components/VideoList';

const initialVideos = [
  {
    id: 1,
    title: 'Introduction to Next.js',
    description: 'A comprehensive overview of the Next.js framework, covering its main features like Server-Side Rendering and Static Site Generation.',
    url: 'https://www.youtube.com/watch?v=kC88u9-i-dc',
    category: 'Frameworks',
  },
  {
    id: 2,
    title: 'Tailwind CSS for Beginners',
    description: 'Learn the basics of Tailwind CSS and how to build beautiful, custom designs without writing a single line of custom CSS.',
    url: 'https://www.youtube.com/watch?v=pfaSUYaSgPo',
    category: 'CSS',
  },
];

export default function Home() {
  const [videos, setVideos] = useState(initialVideos);
  const [currentVideo, setCurrentVideo] = useState(initialVideos[0]);

  // Function to extract YouTube video ID from URL
  const getYouTubeID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleAddVideo = (video) => {
    setVideos([...videos, { ...video, id: Date.now() }]); // Add new video with a unique ID
  };

  const handleDeleteVideo = (id) => {
    setVideos(videos.filter(video => video.id !== id));
    // If the deleted video is the current one, set the current video to the first in the list, or null if the list is empty
    if (currentVideo && currentVideo.id === id) {
        const newCurrentVideo = videos.length > 1 ? videos.find(video => video.id !== id) : null;
        setCurrentVideo(newCurrentVideo);
    }
  };

  const handleWatchVideo = (video) => {
    setCurrentVideo(video);
  };
  
  const videoId = currentVideo ? getYouTubeID(currentVideo.url) : null;

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-16 lg:p-24 bg-gray-50">
      <div className="w-full max-w-7xl mx-auto">
        <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">AI-Powered Learning Platform</h1>
            <p className="mt-2 text-lg text-gray-600">Your personalized journey to mastery starts here.</p>
        </header>

        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Now Playing: {currentVideo ? currentVideo.title : 'No Video Selected'}</h2>
            {videoId ? (
              <VideoPlayer videoId={videoId} />
            ) : (
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center rounded-lg">
                <p className="text-gray-500">Select a video to watch</p>
              </div>
            )}
            <div className="mt-4 p-4 bg-white rounded-lg shadow">
                <h3 className="font-bold text-lg text-gray-900">Description</h3>
                <p className="text-gray-700 mt-1">{currentVideo ? currentVideo.description : 'No video selected.'}</p>
            </div>
          </div>

          <div>
            <div className="p-6 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Add a New Video</h2>
                <AddVideoForm onAddVideo={handleAddVideo} />
            </div>
          </div>
        </div>

        <div className="mt-12">
            <VideoList 
                videos={videos} 
                onWatch={handleWatchVideo} 
                onDelete={handleDeleteVideo}
            />
        </div>
      </div>
    </main>
  );
}