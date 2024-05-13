import { currentUser } from "@clerk/nextjs/server";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Can only be run on the server
 * @returns Boolean - if user is admin
 */
export async function isAdmin(): Promise<Boolean> {
  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress as string;
  const adminEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(" ");

  return Boolean(adminEmails && adminEmails.includes(userEmail));
}
