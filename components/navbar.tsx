import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex justify-between p-4">
      <Link href="/"> Home</Link>
      <Link href="/properties">Properties</Link>
    </nav>
  );
}
