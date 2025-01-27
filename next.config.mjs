/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow network access
  output: "standalone", // Enables easier deployment
  reactStrictMode: true,

  // Webpack configuration for advanced network settings
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jam.dev",
      },
    ],
  },
  // Optional: Add environment configuration
  env: {
    // You can add environment-specific variables here
    NEXT_PUBLIC_APP_URL:
      process.env.NODE_ENV === "production"
        ? "https://myproject.local"
        : "http://localhost:3000",
  },
};

export default nextConfig;
