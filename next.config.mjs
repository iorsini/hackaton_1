/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: '.next', // Force standard output directory
  eslint: {
    dirs: ['src/app', 'src/components', 'src/lib'], // Be more specific
  },
};

export default nextConfig;