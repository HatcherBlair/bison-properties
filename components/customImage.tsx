import Image from "next/image";

// Creates a Next Image
// Extracted into its own component so that it can be used with server components
// Width defaults to window width to allow for fullscreen carousels
export default function CustomImage({
  src,
  alt,
  height,
  width,
}: {
  src: string;
  alt: string;
  height: number;
  width: number;
}): JSX.Element {
  return <Image src={src} alt={alt} height={height} width={width} />;
}
