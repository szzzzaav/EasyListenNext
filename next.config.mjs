import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ldggoeiltbtpogdzcfwa.supabase.co",
        port: "",
        pathname: "/storage/**",
      },
    ],
  },

  // experimental: {
  //   prefetch: true,
  // },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
