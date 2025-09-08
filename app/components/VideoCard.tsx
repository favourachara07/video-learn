"use client";

import React from "react";
import toast from "react-hot-toast";

type Video = {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
};

interface VideoCardProps {
  video: Video;
  onDeleteVideo: (videoId: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onDeleteVideo }) => {
  const handleDelete = () => {
    toast.loading("Deleting video...", { id: video.id });

    // Simulate async delete operation
    setTimeout(() => {
      onDeleteVideo(video.id);
      toast.success(`"${video.title}" has been deleted successfully!`, {
        id: video.id,
      });
    }, 500);
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {video.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {video.description}
          </p>
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
            {video.category}
          </span>
        </div>

        <button
          onClick={handleDelete}
          className="ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
          title="Delete video"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors duration-200"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          Watch Video
        </a>
      </div>
    </div>
  );
};

export default VideoCard;
