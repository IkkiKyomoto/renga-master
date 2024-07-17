/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
    ppr: true,
  },
  // webpack: (config, { isServer }) => {
  //     if (!isServer) {
  //         config.resolve.fallback = {
  //             fs: false,
  //         }
  //     }
  // }
};

export default nextConfig;
