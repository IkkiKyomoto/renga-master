/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        externalDir: true,
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
