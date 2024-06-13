import { useEffect, useState } from "react";
import { Caption, SignedURL } from "../lib/definitions";
import { fetchPresignedURLs } from "../lib/api";
import clsx from "clsx";
import { convertHandlesToHyperlink } from "./utils";
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
      <div className="grid gap-4 md:grid-cols-3">
        {signedVideoUrls.map((signedVideoUrl, index) => (
          <video autoPlay controls key={`video-${index}`}>
            <source src={signedVideoUrl.url} type="video/mp4" />
          </video>
        ))}

        {presignedUrls.map((media, index) => (
          <button
            key={`image-${index}`}
            className={clsx(
              "relative w-full",
              presignedUrls.length === 5 &&
                "first:md:col-span-2 first:md:row-span-2",
              signedVideoUrls.length > 0 &&
                presignedUrls.length === 5 &&
                "appearance-none first-of-type:md:col-span-2 first-of-type:md:row-span-2"
            )}
            style={{ aspectRatio: "1 / 1" }}
            onClick={() => setImagePreview(media.url)}
          >
            <Image
              src={media.url}
              alt={`supplemental imagery for episode - ${index}`}
              layout="fill"
              objectFit="cover"
              className="h-full w-full"
            />
          </button>
        ))}

        <p
          className="whitespace-break-spaces pl-4 text-2xl"
          dangerouslySetInnerHTML={{ __html: convertHandlesToHyperlink(text) }}
        />
        <p
          className="whitespace-break-spaces pl-4 text-2xl text-secondary"
          dangerouslySetInnerHTML={{
            __html: convertHandlesToHyperlink(text_en),
          }}
        />
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
