"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

type VideoRef = React.RefObject<HTMLVideoElement>;
type VideoSrc = string;
type Height = number;
type Width = number;
type Duration = number;
type CurrentTime = number;
type IsPlaybackOn = boolean;

interface VideoContextProps {
  currentTime: CurrentTime;
  isPlaybackOn: IsPlaybackOn;
  videoRef: VideoRef;
  videoSrc: VideoSrc;
  handlePlayPause: () => void;
  uploadVideo: (videoURL: string) => void;
}

const VideoContext = createContext<VideoContextProps | undefined>(undefined);

export const VideoProvider = ({ children }: { children: React.ReactNode }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<VideoSrc>("/video.mp4");
  const [isPlaybackOn, setPlaybackOn] = useState<IsPlaybackOn>(false);
  const [currentTime, setCurrentTime] = useState<CurrentTime>(0);

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

  useEffect(() => {
    const interval = setInterval(() => {}, 200);
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setPlaybackOn(() => true);
      } else {
        videoRef.current.pause();
        setPlaybackOn(() => false);
      }
    }
  };

  const uploadVideo = (videoURL: string) => {
    setVideoSrc(() => videoURL);
  };

  return (
    <VideoContext.Provider
      value={{
        currentTime,
        isPlaybackOn,
        videoRef,
        videoSrc,
        handlePlayPause,
        uploadVideo,
      }}
    >
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
