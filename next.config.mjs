/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "b7l9chuqq1kb2cre.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
