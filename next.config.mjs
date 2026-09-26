/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // static export for Cloudflare Pages (build output: /out)
  trailingSlash: true,
  images: { unoptimized: true }, // required for static export
};

export default nextConfig;
