/** @type {import('next').NextConfig} */
import withBundleAnalyzer from "@next/bundle-analyzer";

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
};

export default nextConfig;
