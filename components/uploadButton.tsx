"use client";

import { useVideo } from "@/contexts/VideoContext";

export default function UploadButton() {
  const { uploadVideo } = useVideo();

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      uploadVideo(videoURL);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="video/*"
        onChange={handleVideoUpload}
        className="hidden"
        id="video-upload-input"
      />
      <label
        htmlFor="video-upload-input"
        className="px-4 py-2 border border-gray-200 rounded-md text-gray-200 hover:scale-105 transition-all duration-200 cursor-pointer"
      >
        &#x21E7; &nbsp; Upload New Video
      </label>
    </>
  );
}
