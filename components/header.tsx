import Image from "next/image";
import CtaContainer from "./ctaContainer";
import UploadButton from "./uploadButton";

export default function Header() {
  return (
    <div className="flex justify-between p-3 align-middle">
      <Image src="/logo.png" alt="logo" height={44} width={44} />
      <UploadButton />
    </div>
  );
}
