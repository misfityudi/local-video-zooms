"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

type VideoRef = React.RefObject<HTMLVideoElement>;
type VideoSrc = string;
type Height = number;
type Width = number;
type Duration = number;
type CurrentTime = number;
type IsMuted = boolean;
type IsPlaybackOn = boolean;

interface VideoContextProps {
  currentTime: CurrentTime;
  duration: Duration;
  isMuted: IsMuted;
  isPlaybackOn: IsPlaybackOn;
  videoHeight: Height;
  videoWidth: Width;
  videoRef: VideoRef;
  videoSrc: VideoSrc;
  handleMuteUnmute: () => void;
  handlePlayPause: () => void;
  updateCurrentTime: (newTime: number) => void;
  uploadVideo: (videoURL: string) => void;
}

const VideoContext = createContext<VideoContextProps | undefined>(undefined);

export const VideoProvider = ({ children }: { children: React.ReactNode }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<VideoSrc>("/video.mp4");
  const [videoHeight, setVideoHeight] = useState<Height>(0);
  const [videoWidth, setVideoWidth] = useState<Width>(0);
  const [isMuted, setIsMuted] = useState<IsMuted>(false);
  const [isPlaybackOn, setPlaybackOn] = useState<IsPlaybackOn>(false);
  const [currentTime, setCurrentTime] = useState<CurrentTime>(0);
  const [duration, setDuration] = useState<Duration>(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleMetadataLoaded = () => {
      setVideoHeight(video.height);
      setVideoWidth(video.width);
      setCurrentTime(0);
      setDuration(video.duration * 1000);
    };

    video.src = videoSrc;
    video.load();
    video.addEventListener("loadedmetadata", handleMetadataLoaded);

    return () => {
      video.removeEventListener("loadedmetadata", handleMetadataLoaded);
      if (videoSrc) {
        URL.revokeObjectURL(videoSrc);
      }
    };
  }, [videoSrc]);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    const updateTime = () => {
      setCurrentTime(video.currentTime * 1000);
    };

    if (!video.paused) {
      const interval = setInterval(updateTime, 100);

      return () => {
        clearInterval(interval);
      };
    }
  }, [videoRef.current?.paused]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      video.muted = false;
      video.volume = 0.5;
      setCurrentTime(video.duration * 1000);
      setIsMuted(false);
      setPlaybackOn(false);
    };

    video.addEventListener("ended", handleVideoEnd);

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
    };
  }, [videoRef.current]);

  const handleMuteUnmute = () => {
    if (videoRef.current) {
      if (videoRef.current.muted) {
        videoRef.current.muted = false;
        videoRef.current.volume = 0.5;
        setIsMuted(false);
      } else {
        videoRef.current.muted = true;
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setPlaybackOn(true);
      } else {
        videoRef.current.pause();
        setPlaybackOn(false);
      }
    }
  };

  const updateCurrentTime = (newTime: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      videoRef.current.play();
      setPlaybackOn(true);
    }
  };

  const uploadVideo = (videoURL: string) => {
    setVideoSrc(() => videoURL);
  };

  return (
    <VideoContext.Provider
      value={{
        currentTime,
        duration,
        isMuted,
        isPlaybackOn,
        videoRef,
        videoSrc,
        videoHeight,
        videoWidth,
        handleMuteUnmute,
        handlePlayPause,
        updateCurrentTime,
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
    throw new Error("useVideo must be used within a VideoProvider");
  }
  return context;
};
