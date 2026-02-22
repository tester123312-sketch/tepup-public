import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Mark Prisma and pg as external to avoid bundling issues
  serverExternalPackages: ['@prisma/client', '@prisma/adapter-pg', 'pg'],
};

export default nextConfig;
