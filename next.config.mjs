/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bison-properties-file-store.s3.us-east-1.amazonaws.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
