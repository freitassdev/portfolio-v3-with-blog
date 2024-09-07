/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    webpack: (config) => {
      config.externals = [...config.externals, "bcryptjs"];
      return config;
    },
  };
  
module.exports = nextConfig;