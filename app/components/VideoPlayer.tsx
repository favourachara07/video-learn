"use client";

import { useState } from "react";

interface VideoPlayerProps {
  videoId: string;
}

const VideoPlayer = ({ videoId }: VideoPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative aspect-video bg-black rounded-t-2xl overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 z-10">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/80">Loading video...</p>
          </div>
        </div>
      )}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
        onLoad={() => setIsLoading(false)}
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
