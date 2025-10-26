/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  images: {
    domains: ['localhost', 'images.unsplash.com'],
  },
  
  // 🔥 CORREÇÃO: Configurações para Vercel
  experimental: {
    serverActions: {
      allowedOrigins: ["*"]
    }
  },
  
  // Desabilitar cache agressivo do Next.js
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'Expires', value: '0' },
        ],
      },
    ];
  },
}

module.exports = nextConfig