"use client";

import {
  useZoomBlock,
  ZoomBlock,
  ZoomBlocks,
} from "@/contexts/ZoomBlockContext";
import Image from "next/image";

interface ZoomBlockCarouselProps {
  zoomBlocks: ZoomBlocks;
  removeZoomBlock: (zoomBlock: ZoomBlock) => void;
  selectZoomBlock: (zoomBlock: ZoomBlock) => void;
}

export default function ZoomBlockContainer() {
  const { zoomBlocks, removeZoomBlock, selectZoomBlock } = useZoomBlock();

  if (!zoomBlocks.length) {
    return (
      <p className="text-center">
        Note: There are no Zoom Blocks, play and click on the video to generate
        one!
      </p>
    );
  }
  return (
    <ZoomBlockCarousel
      zoomBlocks={zoomBlocks}
      removeZoomBlock={removeZoomBlock}
      selectZoomBlock={selectZoomBlock}
    />
  );
}

function ZoomBlockCarousel({
  zoomBlocks,
  removeZoomBlock,
  selectZoomBlock,
}: ZoomBlockCarouselProps) {
  const Carousel = () => (
    <div className="items-center self-center justify-center flex">
      {zoomBlocks.map((item, index) => (
        <div key={index} className="relative p-2">
          <div
            className="border-2 border-gray-200 text-gray-200 font-semibold h-4 w-4 p-6 flex items-center justify-center align-middle text-center cursor-pointer"
            onClick={() => selectZoomBlock(item)}
          >
            {index + 1}
          </div>
          <div>
            <Image
              src="/icons/delete.png"
              alt="delete_icon"
              height={24}
              width={24}
              className="cursor-pointer absolute top-0 right-0 z-10 rounded-full border-2 border-gray-200 bg-black p-1"
              onClick={() => removeZoomBlock(item)}
            />
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <div>
      <Carousel />
    </div>
  );
}
