"use client";

import Image from "next/image";
import { useVideo } from "@/contexts/VideoContext";
import formatTime from "@/helpers/formatTime";

export default function Player() {
  const {
    currentTime,
    duration,
    isMuted,
    isPlaybackOn,
    videoRef,
    handleMuteUnmute,
    handlePlayPause,
    updateCurrentTime,
  } = useVideo();

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget; // The progress bar container
    const rect = progressBar.getBoundingClientRect(); // Get the size and position of the progress bar
    const clickX = e.clientX - rect.left; // Mouse click position relative to the progress bar
    const width = rect.width; // Total width of the progress bar
    const clickPercentage = clickX / width; // Percentage of the bar where the click occurred

    console.log("clickPercentage", clickPercentage);

    const newTime = (clickPercentage * duration) / 1000;
    console.log("newTime", newTime);

    updateCurrentTime(newTime);
  };

  return (
    <div className="player flex flex-col self-center my-auto border rounded-lg border-gray-200">
      <video ref={videoRef} className="border-t rounded-t-lg cursor-crosshair">
        Your browser does not support the video tag.
      </video>
      <div className="p-2 flex w-full items-center gap-4">
        {isPlaybackOn ? (
          <Image
            src="/icons/pause.png"
            alt="pause_icon"
            height={32}
            width={32}
            className="cursor-pointer"
            onClick={handlePlayPause}
          />
        ) : (
          <Image
            src="/icons/play.png"
            alt="play_icon"
            height={32}
            width={32}
            className="cursor-pointer"
            onClick={handlePlayPause}
          />
        )}
        {isMuted ? (
          <Image
            src="/icons/mute.png"
            alt="mute_icon"
            height={24}
            width={24}
            className="cursor-pointer"
            onClick={handleMuteUnmute}
          />
        ) : (
          <Image
            src="/icons/unmute.png"
            alt="unmute_icon"
            height={24}
            width={24}
            className="cursor-pointer"
            onClick={handleMuteUnmute}
          />
        )}
        <div className="flex w-full gap-2 align-middle">
          <p className="text-xs self-center text-gray-200">
            {formatTime(currentTime)}
          </p>
          <div
            className="w-full flex flex-col relative rounded-full h-3 self-center"
            onClick={handleSeek}
          >
            <div className="w-full h-full rounded-full bg-gray-600 left-0 cursor-pointer"></div>
            <div
              className="w-1/2 h-full rounded-full bg-gray-200 top-0 left-0 absolute cursor-pointer"
              style={{
                width: `${(currentTime / duration) * 100}%`,
              }}
            ></div>
          </div>
          <p className="text-xs self-center text-gray-200">
            {formatTime(duration)}
          </p>
        </div>
      </div>
    </div>
  );
}
