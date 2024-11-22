"use client";

import { createContext, useContext, useState } from "react";

type StartTime = number;
type EndTime = number;
type XPosition = number;
type YPosition = number;
type Coordinates = {
  x: XPosition;
  y: YPosition;
};
type ZoomFactor = number;

type ZoomBlock = {
  startTime: StartTime;
  endTime: EndTime;
  coordinates: Coordinates;
  zoomFactor: ZoomFactor;
};

export type SelectedZoomBlock = ZoomBlock | undefined;
export type ZoomBlocks = ZoomBlock[] | [];

interface ZoomBlockContextProps {
  selectedZoomBlock: SelectedZoomBlock;
  zoomBlocks: ZoomBlock[];
  addZoomBlock: (zoomBlock: ZoomBlock) => void;
  removeZoomBlock: (zoomBlock: ZoomBlock) => void;
}

const ZoomBlockContext = createContext<ZoomBlockContextProps | undefined>(
  undefined
);

export const ZoomBlockProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedZoomBlock, setSelectedZoomBlock] = useState<ZoomBlock>();
  const [zoomBlocks, setZoomBlocks] = useState<ZoomBlock[]>([]);

  const addZoomBlock = (zoomBlock: ZoomBlock) => {
    setZoomBlocks((prev) => [...prev, zoomBlock]);
  };

  const removeZoomBlock = (zoomBlock: ZoomBlock) => {
    setZoomBlocks((prev) => prev.filter((block) => block !== zoomBlock));
  };

  return (
    <ZoomBlockContext.Provider
      value={{ selectedZoomBlock, zoomBlocks, addZoomBlock, removeZoomBlock }}
    >
      {children}
    </ZoomBlockContext.Provider>
  );
};

export const useZoomBlock = () => {
  const context = useContext(ZoomBlockContext);
  if (!context) {
    throw new Error("useTheme must be used within a ZoomBlockProvider");
  }
  return context;
};
