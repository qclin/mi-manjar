import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed sticky top-0 z-20 w-full border-b border-primary bg-paper-light px-4 py-3 text-primary md:px-8">
      <Link href="/podcast" className="textura mt-1 text-xl">
        Mi manjar
      </Link>
    </header>
  );
};

export default Header;
