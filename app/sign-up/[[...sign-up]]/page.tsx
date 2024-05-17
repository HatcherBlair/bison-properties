import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <MaxWidthWrapper>
      <SignUp path="/sign-up" />
    </MaxWidthWrapper>
  );
}
