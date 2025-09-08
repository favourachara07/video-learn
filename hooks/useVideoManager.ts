import { useState, useEffect } from "react";
import {
  Video,
  loadVideosFromStorage,
  saveVideosToStorage,
  loadCurrentVideoFromStorage,
  saveCurrentVideoToStorage,
} from "../utils/storage";

export type VideoInput = {
  title: string;
  description: string;
  url: string;
  category: string;
};

export const useVideoManager = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
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

  const handleAddVideo = (video: VideoInput) => {
    const newVideo = { ...video, id: Date.now() };
    setVideos((prevVideos) => [...prevVideos, newVideo]);
  };

  const handleDeleteVideo = (id: number) => {
    const newVideos = videos.filter((video) => video.id !== id);
    setVideos(newVideos);

    if (currentVideo && currentVideo.id === id) {
      const newCurrentVideo = newVideos.length > 0 ? newVideos[0] : null;
      setCurrentVideo(newCurrentVideo);
    }
  };

  const handleWatchVideo = (video: Video) => {
    setCurrentVideo(video);
  };

  return {
    videos,
    currentVideo,
    isLoaded,
    handleAddVideo,
    handleDeleteVideo,
    handleWatchVideo,
  };
};