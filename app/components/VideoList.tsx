"use client";

import { showToast } from "../utils/toast";

type WatchVideo = {
  id: number;
  title: string;
  description: string;
  category: string;
  url: string;
};

type VideoListProps = {
  videos: WatchVideo[];
  currentVideoId?: number;
  onWatch: (video: WatchVideo) => void;
  onDelete: (id: number) => void;
};

const VideoList = ({
  videos,
  currentVideoId,
  onWatch,
  onDelete,
}: VideoListProps) => {
  const handleDeleteConfirm = (video: WatchVideo) => {
    const confirmed = window.confirm(`Do you want to delete "${video.title}"?`);

    if (confirmed) {
      onDelete(video.id);
      showToast.success(`"${video.title}" has been deleted from your library`);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 p-6 text-white">
        <div className="flex items-center gap-3">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <div>
            <h2 className="text-xl font-bold">Learning Library</h2>
            <p className="text-white/80 text-sm mt-1">
              {videos.length} courses available
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {videos.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-slate-400"
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
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              No Videos Yet
            </h3>
            <p className="text-slate-500">
              Start building your learning library by adding your first video
              below.
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
            {videos.map((video) => (
              <div
                key={video.id}
                className={`group relative bg-white rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  currentVideoId === video.id
                    ? "border-indigo-500 shadow-lg ring-2 ring-indigo-200"
                    : "border-slate-200 hover:border-indigo-300"
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className={`w-3 h-3 rounded-full mt-2 ${
                        currentVideoId === video.id
                          ? "bg-indigo-500"
                          : "bg-slate-300"
                      }`}
                    ></div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg text-slate-800 group-hover:text-indigo-600 transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                        {video.description}
                      </p>
                      {video.category && (
                        <span className="inline-block mt-3 px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full">
                          {video.category}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onWatch(video)}
                      className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        currentVideoId === video.id
                          ? "bg-indigo-600 text-white"
                          : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                      }`}
                    >
                      {currentVideoId === video.id ? "▶ Playing" : "Watch"}
                    </button>
                    <button
                      onClick={() => handleDeleteConfirm(video)}
                      className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                      title="Delete video"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoList;
