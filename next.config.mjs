/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'metadata.ens.domains',
      },
    ],
  },
};

export default nextConfig;
