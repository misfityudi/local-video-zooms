import Header from "@/components/header";
import Player from "@/components/player";
import SelectedZoomBlock from "@/components/selectedZoomBlock";
import ZoomBlockContainer from "@/components/zoomBlockContainer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="my-auto gap-8 flex flex-col">
        <div className="flex justify-center gap-3 align-middle">
          <Player />
          <SelectedZoomBlock />
        </div>
        <ZoomBlockContainer />
      </div>
    </div>
  );
}
