"use client";

import { useState, useEffect } from "react";
import VideoPlayer from "./components/VideoPlayer";
import AddVideoForm from "./components/AddVideoForm";
import VideoList from "./components/VideoList";

const initialVideos = [
  {
    id: 1,
    title: "Introduction to Next.js",
    description:
      "A comprehensive overview of the Next.js framework, covering its main features like Server-Side Rendering and Static Site Generation.",
    url: "https://www.youtube.com/watch?v=kC88u9-i-dc",
    category: "Frameworks",
  },
  {
    id: 2,
    title: "Tailwind CSS for Beginners",
    description:
      "Learn the basics of Tailwind CSS and how to build beautiful, custom designs without writing a single line of custom CSS.",
    url: "https://www.youtube.com/watch?v=pfaSUYaSgPo",
    category: "CSS",
  },
  {
    id: 3,
    title: "Mastering React State",
    description:
      "Deep dive into React state management, from useState to context API and beyond.",
    url: "https://www.youtube.com/watch?v=1wZoGFF_n7Y",
    category: "React",
  },
];

// Helper function to extract YouTube video ID from URL
const getYouTubeID = (url) => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Helper functions for localStorage
const loadVideosFromStorage = () => {
  if (typeof window !== "undefined") {
    try {
      const savedVideos = localStorage.getItem("edulearn-videos");
      if (savedVideos) {
        const parsedVideos = JSON.parse(savedVideos);
        // If we have saved videos, use them; otherwise use initial videos
        return parsedVideos.length > 0 ? parsedVideos : initialVideos;
      }
    } catch (error) {
      console.error("Error loading videos from localStorage:", error);
    }
  }
  return initialVideos;
};

const saveVideosToStorage = (videos) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("edulearn-videos", JSON.stringify(videos));
    } catch (error) {
      console.error("Error saving videos to localStorage:", error);
    }
  }
};

const loadCurrentVideoFromStorage = (videos) => {
  if (typeof window !== "undefined") {
    try {
      const savedCurrentVideoId = localStorage.getItem(
        "edulearn-current-video"
      );
      if (savedCurrentVideoId) {
        const currentVideo = videos.find(
          (video) => video.id === parseInt(savedCurrentVideoId)
        );
        if (currentVideo) {
          return currentVideo;
        }
      }
    } catch (error) {
      console.error("Error loading current video from localStorage:", error);
    }
  }
  return videos.length > 0 ? videos[0] : null;
};

const saveCurrentVideoToStorage = (videoId) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("edulearn-current-video", videoId.toString());
    } catch (error) {
      console.error("Error saving current video to localStorage:", error);
    }
  }
};

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const loadedVideos = loadVideosFromStorage();
    setVideos(loadedVideos);
    const loadedCurrentVideo = loadCurrentVideoFromStorage(loadedVideos);
    setCurrentVideo(loadedCurrentVideo);
    setIsLoaded(true);
  }, []);

  // Save videos to localStorage whenever videos change
  useEffect(() => {
    if (isLoaded) {
      saveVideosToStorage(videos);
    }
  }, [videos, isLoaded]);

  // Save current video to localStorage whenever currentVideo changes
  useEffect(() => {
    if (isLoaded && currentVideo) {
      saveCurrentVideoToStorage(currentVideo.id);
    }
  }, [currentVideo, isLoaded]);

  const handleAddVideo = (video) => {
    const newVideo = { ...video, id: Date.now() };
    setVideos((prevVideos) => [...prevVideos, newVideo]);
  };

  const handleDeleteVideo = (id) => {
    const newVideos = videos.filter((video) => video.id !== id);
    setVideos(newVideos);

    if (currentVideo && currentVideo.id === id) {
      const newCurrentVideo = newVideos.length > 0 ? newVideos[0] : null;
      setCurrentVideo(newCurrentVideo);
    }
  };

  const handleWatchVideo = (video) => {
    setCurrentVideo(video);
  };

  // Don't render until data is loaded from localStorage
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your learning library...</p>
        </div>
      </div>
    );
  }

  const videoId = currentVideo ? getYouTubeID(currentVideo.url) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-xl border-b border-slate-200/50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                EduLearn AI
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6 max-w-7xl">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Video Player Section */}
          <div className="xl:col-span-3">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20">
              {videoId ? (
                <VideoPlayer videoId={videoId} />
              ) : (
                <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-10 h-10 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">
                      Ready to Start Learning?
                    </h3>
                    <p className="text-slate-500">
                      Select a video from the library to begin your educational
                      journey.
                    </p>
                  </div>
                </div>
              )}
              {currentVideo && (
                <div className="p-8 bg-white/50">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-16 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>
                    <div>
                      <h2 className="text-3xl font-bold text-slate-800 mb-3">
                        {currentVideo.title}
                      </h2>
                      <p className="text-slate-600 leading-relaxed text-lg">
                        {currentVideo.description}
                      </p>
                      <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                        {currentVideo.category}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: Video List */}
          <div className="xl:col-span-1">
            <VideoList
              videos={videos}
              currentVideoId={currentVideo?.id}
              onWatch={handleWatchVideo}
              onDelete={handleDeleteVideo}
            />
          </div>

          {/* Add Video Form - Full Width */}
          <div className="xl:col-span-4 mt-8">
            <AddVideoForm onAddVideo={handleAddVideo} />
          </div>
        </div>
      </main>
    </div>
  );
}
