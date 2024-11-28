import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["avatars.githubusercontent.com"], // this domain to image from next to use avatar from github
  },
};

export default nextConfig;
