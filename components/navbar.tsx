import Link from "next/link";
import { getSession } from "@auth0/nextjs-auth0";

export default async function NavBar() {
  const session = await getSession();

  return (
    <nav className="flex justify-between p-4">
      <Link href="/"> Home</Link>
      {session ? (
        <Link href="/api/auth/logout">Logout</Link>
      ) : (
        <Link href="/api/auth/login">Login</Link>
      )}
      <Link href="/properties">Properties</Link>
    </nav>
  );
}
