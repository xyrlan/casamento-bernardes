/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // WebP: quase tão leve quanto AVIF e muito mais rápido de gerar na primeira visita
    formats: ["image/webp"],
  },
};

export default nextConfig;
