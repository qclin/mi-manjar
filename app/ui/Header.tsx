import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed sticky top-0 z-20 w-full border-b border-primary bg-paper-light px-8 py-3 text-primary">
      <Link href="/podcast" className="textura mt-1 text-xl">
        Mi manjar
      </Link>
    </header>
  );
};

export default Header;