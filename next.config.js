/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.externals = [...config.externals, "bcryptjs"];
      return config;
    },
  };
  
  module.exports = nextConfig;
  