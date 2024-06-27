import PictureCarousel from "@/components/picturesCarousel";
import About from "@/components/aboutSection";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { cn, isAdmin } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { fetchFiles } from "@/AWSComponents/s3Actions";

export default async function Home() {
  const [_, imageUrls] = await fetchFiles();

  return (
    <div>
      <div className="bg-slate-200">
        <MaxWidthWrapper>
          <h1 className=" text-center font-semibold py-5 p-16 text-5xl">
            <span className="text-blue-800">Bison</span> Properties
          </h1>
          {(await isAdmin()) && (
            <Link
              className={cn([buttonVariants({ variant: "outline" })])}
              href="/edit-images"
            >
              Add new Images to Homepage
            </Link>
          )}
        </MaxWidthWrapper>
        <div className="w-full lg:aspect-[16/4] aspect-[16/6] m-0 p-0">
          {imageUrls && <PictureCarousel images={imageUrls as string[]} />}
        </div>
      </div>
      <MaxWidthWrapper>
        <About />
      </MaxWidthWrapper>
    </div>
  );
}
