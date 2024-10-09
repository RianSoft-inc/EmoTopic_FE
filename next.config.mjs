/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/proxy/basic",
        destination: "https://api.flow-talk.com/api/basic", // API path에 "api" 포함
      },
      {
        source: "/api/proxy/word-cloud/:id",
        destination: "https://api.flow-talk.com/api/word-cloud/:id", // "api" 포함
      },
    ];
  },
};

export default nextConfig;
