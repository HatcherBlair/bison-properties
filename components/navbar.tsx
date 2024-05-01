import Link from "next/link";

export default async function NavBar() {
  return (
    <nav className="flex justify-between p-4">
      <Link href="/"> Home</Link>
      <Link href="/sign-up">Sign Up</Link>
      <Link href="/sign-in">Sign In</Link>

      <Link href="/properties">Properties</Link>
    </nav>
  );
}
