/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'www.shutterstock.com',
          port: '', 
          pathname: '/image-vector/**', 
        },
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          port: '',
          pathname: '/dyt5nloyw/image/upload/**',
        },
      ],
    },
  };
  
  export default nextConfig;