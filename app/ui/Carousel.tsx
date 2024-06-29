import { useEffect, useState } from "react";
import { Caption, SignedURL } from "../lib/definitions";
import { fetchPresignedURLs } from "../lib/api";
import Image from "next/image";
import Modal from "./Modal";

type Props = {
  caption: Caption;
};
const Carousel = ({ caption }: Props) => {
  const [presignedUrls, setPresignedUrls] = useState<SignedURL[]>([]);
  const [signedVideoUrls, setVideoUrls] = useState<SignedURL[]>([]);
  const [imagePreview, setImagePreview] = useState<string>();

  const { text, text_en, images, videos } = caption;
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (images.length > 0) {
          const data = await fetchPresignedURLs(images);
          setPresignedUrls(data);
        }
        if (videos.length > 0) {
          const data = await fetchPresignedURLs(videos);
          setVideoUrls(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [images, videos]);

  return (
    <div>
      <div className="boder-primary relative mx-auto w-full overflow-x-scroll border-b p-4">
        <div className="flex space-x-4 px-4">
          {signedVideoUrls.map((signedVideoUrl, index) => (
            <video
              autoPlay
              controls
              key={`video-${index}`}
              className="h-[300px]
            flex-none rounded-lg"
            >
              <source src={signedVideoUrl.url} type="video/mp4" />
            </video>
          ))}
          {presignedUrls.map((media, index) => (
            <div
              key={index}
              className="relative h-[300px] w-[300px] flex-none cursor-pointer"
              onClick={() => setImagePreview(media.url)}
            >
              <Image
                src={media.url}
                alt={`supplemental imagery for episode - ${index}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
      <Modal
        isOpen={!!imagePreview}
        onClose={() => setImagePreview(undefined)}
        imageSrc={imagePreview}
      />
    </div>
  );
};

export default Carousel;
