import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-column flex min-h-screen items-center justify-between px-12 py-8 w-full">
      <div className="grid md:grid-cols-2 mx-auto">
        <section className="my-auto flex flex-col items-center gap-4">
          <h1 className="text-8xl textura">Mi manjar </h1>

          <p>
            Mi manjar, is a podcast translator for the series <br />
            <a
              href="https://podiumpodcast.com/podcasts/las-hijas-de-felipe-podium-os"
              target="_blank"
            >
              <span className="underline">Las Hijas de Filipe</span> by Ana
              Garriga and Carmen Urbita
            </a>
          </p>
          <Link
            href="podcast"
            className="m-4 w-max rounded border border-fuchsia p-2 font-medium"
          >
            Enter archive
          </Link>
        </section>
        <section className="flex max-w-prose flex-col justify-between gap-4 text-lg">
          <p>
            The project began as a romantic exchange with my girlfriend, who
            suggested episodes from the series discussing topics such as bodily
            fluids (tears, milk, secretions) and the austere lifestyles of
            Baroque nuns. My goal was to understand a podcast in another
            language and to find these specific moments of discussion in
            hour-long audios.
          </p>
          <p>
            In the end, I built{" "}
            <span className="font-medium text-fuchsia underline decoration-fuchsia decoration-wavy">
              Mi manjar
            </span>
            , an archive of all 52 episodes of the podcast. Each episode has
            been transcribed with{" "}
            <span className="font-medium text-sky-700">Assembly.ai</span>,
            translated into English with{" "}
            <span className="font-medium text-sky-700">DeepL</span>, and
            highlighted using{" "}
            <span className="font-medium text-sky-700">Chat GPT-4</span>. Every
            episode features an index table of highlights to peruse, along with
            citations of literal references mentioned in the show. The archive
            is a fully searchable database of 12.82k records, powered by the{" "}
            <span className="font-medium text-sky-700">Algolia Search API</span>
            .
          </p>
          <p>
            Mi manjar means my delicacy, as this has been such a pleasure
            project for me. More on mi manjar from the authors themselve in
            <Link
              href={`podcast/3/6?start=950962`}
              className="mx-2 underline decoration-lime-700 decoration-double"
            >
              Son estas lágrimas mi manjar
            </Link>
          </p>
          <p>
            Thanks to Studio Hold for design support, and thanks to mi amor.
          </p>
        </section>
      </div>
    </main>
  );
}
