import {
  SignInButton,
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "./themeButton";

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
      <ModeToggle />

      <Link href="/properties">Properties</Link>
    </nav>
  );
}
