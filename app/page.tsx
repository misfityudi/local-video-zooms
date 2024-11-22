import Header from "@/components/header";
import Player from "@/components/player";
import ZoomBlockContainer from "@/components/zoomBlockContainer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="my-auto gap-8 flex flex-col">
        <Player />
        <ZoomBlockContainer />
      </div>
    </div>
  );
}
