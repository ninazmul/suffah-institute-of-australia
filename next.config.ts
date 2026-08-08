/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source', // Treats .md files as raw text string assets
    });
    return config;
  },
};

module.exports = nextConfig;