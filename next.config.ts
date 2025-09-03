import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['pageComponents', 'utils'],
  },
};

export default nextConfig;
