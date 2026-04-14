import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Autoriser les images locales du dossier public/projects
    // et les URLs externes si nécessaire
    remotePatterns: [],
  },
}

export default nextConfig
