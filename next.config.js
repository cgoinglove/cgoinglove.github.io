const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'export',
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/components/*')],
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
