"use client";

import { useZoomBlock } from "@/contexts/ZoomBlockContext";
import formatTime from "@/helpers/formatTime";

export default function SelectedZoomBlock() {
  const { selectedZoomBlock } = useZoomBlock();

  if (!selectedZoomBlock) return;

  return (
    <div className="self-center border-l-2 border-gray-200 pl-3 py-4">
      <p className="font-semibold pb-2">Selected zoom block:</p>
      <p>Start time: {formatTime(selectedZoomBlock?.startTime)}</p>
      <p>End time: {formatTime(selectedZoomBlock?.endTime)}</p>
      <p>
        Co-ordinates: {selectedZoomBlock?.coordinates.x.toFixed(2)},{" "}
        {selectedZoomBlock?.coordinates.y.toFixed(2)}
      </p>
      <p>Zoom factor: {selectedZoomBlock?.zoomFactor}</p>
    </div>
  );
}
