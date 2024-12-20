"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type BlockId = number;
type StartTime = number;
type EndTime = number;
type XPosition = number;
type YPosition = number;
type ZoomFactor = number;

export type ZoomBlock = {
  blockId: BlockId;
  startTime: StartTime;
  endTime: EndTime;
  x: XPosition;
  y: YPosition;
  zoomFactor: ZoomFactor;
};

export type SelectedZoomBlock = ZoomBlock | undefined;
export type ZoomBlocks = ZoomBlock[] | [];

interface ZoomBlockContextProps {
  selectedZoomBlock: SelectedZoomBlock;
  zoomBlocks: ZoomBlock[];
  addZoomBlock: (zoomBlock: ZoomBlock) => void;
  removeZoomBlock: (removedBlockId: BlockId) => void;
  selectZoomBlock: (selectedBlock: ZoomBlock) => void;
  updateZoomBlock: (updatedZoomBlock: Partial<NonNullable<ZoomBlock>>) => void;
}

const ZoomBlockContext = createContext<ZoomBlockContextProps | undefined>(
  undefined
);

export const ZoomBlockProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedZoomBlock, setSelectedZoomBlock] =
    useState<SelectedZoomBlock>();
  const [zoomBlocks, setZoomBlocks] = useState<ZoomBlock[]>([]);

  useEffect(() => {
    setZoomBlocks((prev) =>
      prev.map((block) =>
        block.blockId === selectedZoomBlock?.blockId
          ? { ...block, ...selectedZoomBlock }
          : block
      )
    );
  }, [selectedZoomBlock]);

  useEffect(() => {
    setZoomBlocks((prev) => {
      const sortedBlocks = [...prev].sort((a, b) => a.startTime - b.startTime);

      sortedBlocks.forEach((block, index) => {
        block.blockId = index;
      });

      setSelectedZoomBlock(sortedBlocks[sortedBlocks.length - 1]);

      return sortedBlocks;
    });
  }, [zoomBlocks.length]);

  useEffect(() => {}, [selectedZoomBlock]);

  const addZoomBlock = (zoomBlock: ZoomBlock) => {
    setZoomBlocks((prev) => [...prev, zoomBlock]);
  };

  const removeZoomBlock = (removedBlockId: BlockId) => {
    setZoomBlocks((prev) =>
      prev.filter((block) => block.blockId !== removedBlockId)
    );
  };

  const selectZoomBlock = (blockToSelect: ZoomBlock) => {
    const selectedBlock: ZoomBlock | undefined = zoomBlocks.find(
      (block) => block.blockId === blockToSelect.blockId
    );

    if (selectedBlock) {
      setSelectedZoomBlock(selectedBlock);
    } else {
      setSelectedZoomBlock(blockToSelect);
    }
  };

  const updateZoomBlock = (
    updatedZoomBlock: Partial<NonNullable<ZoomBlock>>
  ) => {
    setSelectedZoomBlock((prev) => {
      if (!prev) return;
      return {
        ...prev,
        ...updatedZoomBlock,
      };
    });
  };

  return (
    <ZoomBlockContext.Provider
      value={{
        selectedZoomBlock,
        zoomBlocks,
        addZoomBlock,
        removeZoomBlock,
        selectZoomBlock,
        updateZoomBlock,
      }}
    >
      {children}
    </ZoomBlockContext.Provider>
  );
};

export const useZoomBlock = () => {
  const context = useContext(ZoomBlockContext);
  if (!context) {
    throw new Error("useZoomBlock must be used within a ZoomBlockProvider");
  }
  return context;
};
