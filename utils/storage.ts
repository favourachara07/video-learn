import { initialVideos } from "../app/components/data";

export type Video = {
  id: number;
  url: string;
  title: string;
  description: string;
  category: string;
};

export const loadVideosFromStorage = (): Video[] => {
  if (typeof window !== "undefined") {
    try {
      const savedVideos = localStorage.getItem("edulearn-videos");
      if (savedVideos) {
        const parsedVideos = JSON.parse(savedVideos);
        return parsedVideos.length > 0 ? parsedVideos : initialVideos;
      }
    } catch (error) {
      console.error("Error loading videos from localStorage:", error);
    }
  }
  return initialVideos;
};

export const saveVideosToStorage = (videos: Video[]): void => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("edulearn-videos", JSON.stringify(videos));
    } catch (error) {
      console.error("Error saving videos to localStorage:", error);
    }
  }
};

export const loadCurrentVideoFromStorage = (videos: Video[]): Video | null => {
  if (typeof window !== "undefined") {
    try {
      const savedCurrentVideoId = localStorage.getItem("edulearn-current-video");
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

export const saveCurrentVideoToStorage = (videoId: number): void => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("edulearn-current-video", videoId.toString());
    } catch (error) {
      console.error("Error saving current video to localStorage:", error);
    }
  }
};