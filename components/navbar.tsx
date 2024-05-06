import {
  SignInButton,
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default async function NavBar() {
  return (
    <nav className="flex justify-between p-4">
      <Link href="/"> Home</Link>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>

      <Link href="/properties">Properties</Link>
    </nav>
  );
}
