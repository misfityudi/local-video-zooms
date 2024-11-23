"use client";

import { useVideo } from "@/contexts/VideoContext";
import { useZoomBlock } from "@/contexts/ZoomBlockContext";
import formatTime from "@/helpers/formatTime";

export default function SelectedZoomBlock() {
  const { duration } = useVideo();
  const { zoomBlocks, selectedZoomBlock, updateZoomBlock } = useZoomBlock();

  if (!selectedZoomBlock || !zoomBlocks.length) return;

  const handleChange = (field: keyof typeof selectedZoomBlock, value: any) => {
    if (field === "startTime") {
      updateZoomBlock({ [field]: value, endTime: value + 1000 });
    }
    updateZoomBlock({ [field]: value });
  };

  return (
    <div className="flex flex-col self-center border-l-2 border-gray-600 pl-3 py-4 max-w-64 gap-1">
      <p className="font-semibold">Selected zoom block:</p>

      <label htmlFor="start-time">
        Start time: {formatTime(selectedZoomBlock.startTime)}
        <input
          type="range"
          id="start-time"
          min="0"
          max={duration}
          step="100"
          value={selectedZoomBlock.startTime}
          onChange={(e) =>
            handleChange("startTime", parseInt(e.target.value, 10))
          }
        />
      </label>

      <label htmlFor="end-time">
        End time: {formatTime(selectedZoomBlock.endTime)}
        <input
          type="range"
          id="end-time"
          min={selectedZoomBlock.startTime + 1000}
          max={duration}
          step="100"
          value={selectedZoomBlock.endTime}
          onChange={(e) =>
            handleChange("endTime", parseInt(e.target.value, 10))
          }
        />
      </label>

      <div>
        <label htmlFor="x-coordinate">
          X Coordinate: {selectedZoomBlock.coordinates.x.toFixed(2)}
          <input
            type="number"
            id="x-coordinate"
            className="mt-1"
            step="0.01"
            value={selectedZoomBlock.coordinates.x.toFixed(2)}
            onChange={(e) =>
              handleChange("coordinates", {
                ...selectedZoomBlock.coordinates,
                x: parseFloat(e.target.value),
              })
            }
          />
        </label>
        <label htmlFor="y-coordinate">
          Y Coordinate: {selectedZoomBlock.coordinates.y.toFixed(2)}
          <input
            type="number"
            id="y-coordinate"
            className="mt-1"
            step="0.01"
            value={selectedZoomBlock.coordinates.y.toFixed(2)}
            onChange={(e) =>
              handleChange("coordinates", {
                ...selectedZoomBlock.coordinates,
                y: parseFloat(e.target.value),
              })
            }
          />
        </label>
      </div>

      <label htmlFor="zoom-factor">
        Zoom factor: {selectedZoomBlock.zoomFactor}
        <input
          type="number"
          id="zoom-factor"
          className="mt-1"
          min={1}
          step="0.1"
          value={selectedZoomBlock.zoomFactor}
          onChange={(e) =>
            handleChange("zoomFactor", parseFloat(e.target.value))
          }
        />
      </label>
    </div>
  );
}
