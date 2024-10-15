/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: new URL(process.env.NEXT_PUBLIC_CONVEX_URL).hostname,
              port: '', 
              pathname: '/api/storage/**', 
            },
          ],
      },
};

export default nextConfig;
