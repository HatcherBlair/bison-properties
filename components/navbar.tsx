import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

import MaxWidthWrapper from "./maxWidthWrapper";

export default async function NavBar() {
  return (
    <nav className="bg-slate-200 sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-opacity-75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link className="z-40 font-bold text-2xl" href="/">
            Bison<span className="text-blue-800">Properties</span>
          </Link>
          <div className="flex h-full items-center space-x-4">
            <Link href="/properties">Properties</Link>
            <Link href="/about">About</Link>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
