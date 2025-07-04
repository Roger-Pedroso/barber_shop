/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: '"revistapesquisa.fapesp.br"',
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: '"static.vecteezy.com"',
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
