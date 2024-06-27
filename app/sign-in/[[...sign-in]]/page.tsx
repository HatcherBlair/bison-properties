import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <MaxWidthWrapper className="flex justify-center pt-10">
      <SignIn path="/sign-in" />
    </MaxWidthWrapper>
  );
}
