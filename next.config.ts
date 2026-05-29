import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@stafyniaksacha/facturx", "libxmljs"],
  // @ts-ignore - Cette option est requise pour l'accès réseau en dev sur Next 15+
  allowedDevOrigins: ["192.168.0.112", "localhost:3000"]
};

export default nextConfig;

