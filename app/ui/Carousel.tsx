import { useEffect, useState } from "react";
import { Caption, SignedURL } from "../lib/definitions";
import { fetchPresignedURLs } from "../lib/api";
import clsx from "clsx";
import { convertHandlesToHyperlink } from "./utils";

type Props = {
  caption: Caption;
};
const Carousel = ({ caption }: Props) => {
  const [presignedUrls, setPresignedUrls] = useState<SignedURL[]>([]);
  const [signedVidelUrls, setVideoUrls] = useState<SignedURL[]>([]);

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
  }, []);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {signedVidelUrls.map((signedVideoUrl) => (
          <video autoPlay controls>
            <source src={signedVideoUrl.url} type="video/mp4" />
          </video>
        ))}
        {presignedUrls.map((media) => (
          <img
            src={media.url}
            className={clsx(
              "max-h-screen w-full",
              presignedUrls.length === 5 &&
                "first:md:col-span-2 first:md:max-h-full",
              signedVidelUrls.length > 0 &&
                presignedUrls.length === 5 &&
                "first-of-type:md:col-span-2 first-of-type:md:max-h-full"
            )}
          />
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
    </div>
  );
};

export default Carousel;
