import Link from "next/link";
import Header from "../ui/Header";

export default function Page() {
  const HighlightedText = ({ text }: { text: string }) => (
    <span className="font-medium text-sky-700">{text}</span>
  );

  return (
    <main>
      <Header />
      <section className="flex min-h-[93vh] max-w-prose flex-col justify-center gap-4 px-12">
        <p className="decorative">
          The project began as a romantic exchange with my girlfriend, who
          suggested episodes from the series discussing topics such as bodily
          fluids (tears, milk, secretions) and the austere lifestyles of Baroque
          nuns. My goal was to understand a podcast in another language and to
          find these specific moments of discussion in hour-long audios.
        </p>
        <p className="decorative">
          In the end, I built{" "}
          <span className="font-medium text-fuchsia underline decoration-fuchsia decoration-wavy">
            Mi manjar
          </span>
          , an archive of all 52 episodes of the podcast. Each episode has been
          transcribed with <HighlightedText text="Assembly.ai" />, translated
          into English with <HighlightedText text="Deepl" />, and highlighted
          using <HighlightedText text="Chat GPT-4" />. Every episode features an
          index table of highlights to peruse, along with citations of literal
          references mentioned in the show. The archive is a fully searchable
          database of 12.82k records, powered by the{" "}
          <HighlightedText text="Algolia Search API" />.
        </p>
        <p>
          Mi manjar means my delicacy, as this has been such a pleasure project
          for me. More on mi manjar from the authors themselve in
          <Link
            href={`podcast/3/6?start=950962`}
            className="mx-2 underline underline-offset-2"
          >
            Son estas lágrimas mi manjar
          </Link>
        </p>
        <p>
          Thanks to{" "}
          <a
            href="https://studio-hold.com/"
            target="_blank"
            className="underline underline-offset-2"
          >
            Studio Hold
          </a>{" "}
          for design support, and thanks to mi amor.
        </p>
      </section>
    </main>
  );
}
