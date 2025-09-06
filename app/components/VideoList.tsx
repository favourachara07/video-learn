'use client';

const VideoList = ({ videos, onWatch, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Available Courses</h2>
      {videos.length === 0 ? (
        <p className="text-gray-500">No videos have been added yet.</p>
      ) : (
        <div className="space-y-4">
          {videos.map((video) => (
            <div key={video.id} className="p-4 border rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-grow">
                <h3 className="font-bold text-lg text-indigo-700">{video.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{video.description}</p>
              </div>
              <div className="flex-shrink-0 flex gap-2 mt-2 sm:mt-0">
                <button
                  onClick={() => onWatch(video)}
                  className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Watch
                </button>
                <button
                  onClick={() => onDelete(video.id)}
                  className="py-2 px-4 border border-red-500 text-sm font-medium rounded-md text-red-500 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoList;