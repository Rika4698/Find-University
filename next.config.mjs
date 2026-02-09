/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    domains: [
      "upload.wikimedia.org",
      "images.unsplash.com",
      "i.ibb.co.com",
    ],
  },



};

export default nextConfig;
