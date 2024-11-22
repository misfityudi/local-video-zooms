"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

type VideoRef = React.RefObject<HTMLVideoElement>;
type VideoSrc = string;
type Height = number;
type Width = number;
type Duration = number;
type IsPlaybackOn = boolean;

interface VideoContextProps {
  videoRef: VideoRef;
  videoSrc: VideoSrc;
  uploadVideo: (videoURL: string) => void;
}

const VideoContext = createContext<VideoContextProps | undefined>(undefined);

export const VideoProvider = ({ children }: { children: React.ReactNode }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<VideoSrc>("/video.mp4");

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videoSrc; // Update video source
      videoRef.current.load(); // Force the video to reload the new source
    }

    return () => {
      if (videoSrc) {
        URL.revokeObjectURL(videoSrc);
      }
    };
  }, [videoSrc]);

  const uploadVideo = (videoURL: string) => {
    console.log("videoUrl", videoURL);
    setVideoSrc(() => videoURL);
  };

  return (
    <VideoContext.Provider value={{ videoRef, videoSrc, uploadVideo }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useTheme must be used within a VideoProvider");
  }
  return context;
};
