import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed sticky top-0 z-20 w-full border-b border-primary bg-paper-light px-8 py-3 text-primary">
      <h1 className="mt-1 uppercase ">
        <Link href="/podcast" className="textura">
          Mi manjar
        </Link>
      </h1>
    </header>
  );
};

export default Header;
