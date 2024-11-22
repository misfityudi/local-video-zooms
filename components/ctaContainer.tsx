import AddZoomBlockButton from "./addZoomBlockButton";
import UploadButton from "./uploadButton";

export default function CtaContainer() {
  return (
    <div className="flex gap-4">
      <UploadButton />
      <AddZoomBlockButton />
    </div>
  );
}
