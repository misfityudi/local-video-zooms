"use client";

import Image from "next/image";
import { useVideo } from "@/contexts/VideoContext";

export default function Player() {
  const { isPlaybackOn, videoRef, handlePlayPause } = useVideo();

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
            onClick={handlePlayPause}
          />
        ) : (
          <Image
            src="/icons/play.png"
            alt="play_icon"
            height={32}
            width={32}
            onClick={handlePlayPause}
          />
        )}
        <div className="flex w-full gap-2 align-middle">
          <p className="text-xs self-center text-gray-200">
            {videoRef.current?.currentTime.toLocaleString()}
          </p>
          <div className="w-full flex flex-col relative rounded-full h-3 self-center">
            <div className="w-full h-full rounded-full bg-gray-600 left-0"></div>
            <div className="w-1/2 h-full rounded-full bg-gray-200 top-0 left-0 absolute"></div>
          </div>
          <p className="text-xs self-center text-gray-200">
            {videoRef.current?.duration}
          </p>
        </div>
      </div>
    </div>
  );
}
