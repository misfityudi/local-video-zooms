"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useVideo } from "@/contexts/VideoContext";
import { useZoomBlock, ZoomBlock } from "@/contexts/ZoomBlockContext";
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

  const { zoomBlocks, addZoomBlock } = useZoomBlock();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const applyZoom = () => {
      const currentTime = video.currentTime * 1000;
      const rect = video.getBoundingClientRect(); // Get the dimensions of the video player

      // Find the active zoom block
      const activeZoomBlock = zoomBlocks.find(
        (zoomBlock) =>
          currentTime >= zoomBlock.startTime && currentTime <= zoomBlock.endTime
      );

      if (activeZoomBlock) {
        const { x, y } = activeZoomBlock.coordinates;
        const zoomFactor = activeZoomBlock.zoomFactor;

        // Calculate the scaled size of the video
        const scaledWidth = rect.width * zoomFactor;
        const scaledHeight = rect.height * zoomFactor;

        // Calculate the position of the coordinates relative to the center of the video player
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const offsetX = x - centerX; // X offset from the center
        const offsetY = y - centerY; // Y offset from the center

        // Directional panning logic
        let panX = 0;
        let panY = 0;

        if (offsetX < 0) {
          // Left side, pan to the right
          panX = Math.min(0, -(scaledWidth - rect.width) / 2 - offsetX);
        } else {
          // Right side, pan to the left
          panX = Math.max(0, (scaledWidth - rect.width) / 2 - offsetX);
        }

        if (offsetY < 0) {
          // Top side, pan down
          panY = Math.min(0, -(scaledHeight - rect.height) / 2 - offsetY);
        } else {
          // Bottom side, pan up
          panY = Math.max(0, (scaledHeight - rect.height) / 2 - offsetY);
        }

        // Apply the zoom and pan, ensuring clipping of overflow
        video.style.transform = `scale(${zoomFactor}) translate(${panX}px, ${panY}px)`;
      } else {
        // Reset to default zoom if no active zoom block
        video.style.transform = "scale(1) translate(0, 0)";
      }
    };

    // Run applyZoom function on every video time update
    const interval = setInterval(applyZoom, 100);

    return () => clearInterval(interval);
  }, [zoomBlocks]);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickPercentage = clickX / width;

    const newTime = (clickPercentage * duration) / 1000;

    updateCurrentTime(newTime);
  };

  const handleBlockCreation = (e: React.MouseEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const rect = video.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const newZoomBlock: ZoomBlock = {
      blockId: zoomBlocks.length,
      startTime: currentTime,
      endTime: currentTime + 1000,
      coordinates: {
        x: clickX,
        y: clickY,
      },
      zoomFactor: 1.2,
    };

    if (currentTime && currentTime != duration) {
      addZoomBlock(newZoomBlock);
    }
  };

  return (
    <div className="w-3/5 flex flex-col self-center my-auto border rounded-lg border-gray-200 relative overflow-hidden">
      <video
        ref={videoRef}
        className="player border-t rounded-t-lg cursor-zoom-in"
        onClick={handleBlockCreation}
      >
        Your browser does not support the video tag.
      </video>
      <div className="p-2 flex w-full items-center gap-4 z-10 bg-black">
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
