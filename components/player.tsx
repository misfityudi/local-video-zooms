"use client";

import { useVideo } from "@/contexts/VideoContext";

export default function Player() {
  const { videoRef } = useVideo();

  return (
    <video
      ref={videoRef}
      className="player self-center my-auto border rounded-lg border-gray-200"
    >
      Your browser does not support the video tag.
    </video>
  );
}
