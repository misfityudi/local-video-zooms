"use client";

import { useZoomBlock, ZoomBlocks } from "@/contexts/ZoomBlockContext";

interface ZoomBlockCarouselProps {
  zoomBlocks: ZoomBlocks;
}

export default function ZoomBlockContainer() {
  const { zoomBlocks } = useZoomBlock();

  if (!zoomBlocks.length) {
    return (
      <p className="text-center">
        Note: There are no Zoom Blocks, click on the video to generate one!
      </p>
    );
  }
  return <ZoomBlockCarousel zoomBlocks={zoomBlocks} />;
}

function ZoomBlockCarousel({ zoomBlocks }: ZoomBlockCarouselProps) {
  return <div>ZoomBlockCarousel</div>;
}
