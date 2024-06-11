import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-column flex min-h-screen w-full items-center justify-between px-12 py-8 text-primary">
      <section className="m-auto flex flex-col items-center gap-4">
        <h1 className="textura text-8xl">Mi manjar </h1>
        <p>
          Mi manjar, is a podcast translator for the series <br />
          <a
            href="https://podiumpodcast.com/podcasts/las-hijas-de-felipe-podium-os"
            target="_blank"
          >
            <span className="underline underline-offset-2">
              Las Hijas de Filipe
            </span>{" "}
            by Ana Garriga and Carmen Urbita
          </a>
        </p>
        <Link
          href="podcast"
          className="m-4 w-max rounded border border-fuchsia p-2 font-medium"
        >
          Enter archive
        </Link>
      </section>
    </main>
  );
}
