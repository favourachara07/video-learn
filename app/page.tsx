"use client";

import VideoPlayer from "./components/VideoPlayer";
import AddVideoForm from "./components/AddVideoForm";
import VideoList from "./components/VideoList";
import { useVideoManager } from "@/hooks/useVideoManager";
import { getYouTubeID } from "./utils/youtube";


export default function Home() {
    const {
    videos,
    currentVideo,
    isLoaded,
    handleAddVideo,
    handleDeleteVideo,
    handleWatchVideo,
  } = useVideoManager();

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
                      Add a new video or select a video from the library to begin your educational
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
