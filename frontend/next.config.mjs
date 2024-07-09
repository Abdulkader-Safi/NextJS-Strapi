/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: 1337,
        pathname: "/uploads/**/*",
      },
      {
        protocol: "httpc",
        hostname: "placeholder.co",
      },
    ],
  },
};

export default nextConfig;
