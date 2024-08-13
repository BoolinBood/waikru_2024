/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";
// import withBundleAnalyzer from "@next/bundle-analyzer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const nextConfig = withBundleAnalyzer({
//   async headers() {
//     return [
//       {
//         source: "/(.*).(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)",
//         headers: [
//           {
//             key: "Cache-Control",
//             value: "public, max-age=31536000, immutable",
//           },
//         ],
//       },
//     ];
//   },
// });

// export default nextConfig;

const nextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        source: "/(.*).(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
};

export default nextConfig;
