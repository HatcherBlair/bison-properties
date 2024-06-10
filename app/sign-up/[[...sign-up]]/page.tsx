import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <MaxWidthWrapper className="flex justify-center pt-10">
      <SignUp path="/sign-up" />
    </MaxWidthWrapper>
  );
}
