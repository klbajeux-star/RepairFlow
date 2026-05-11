import { PrismaClient } from "../src/generated/client/index.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const DEFAULT_PIN = "123456";

const SEED_USERS = [
  { name: "Patron", role: "ADMIN", color: "#0f172a" },
  { name: "Technicien", role: "TECHNICIEN", color: "#0ea5e9" },
  { name: "Vendeur", role: "VENDEUR", color: "#10b981" },
];

async function main() {
  const pinHash = await bcrypt.hash(DEFAULT_PIN, 10);

  for (const user of SEED_USERS) {
    const existing = await prisma.user.findFirst({ where: { name: user.name } });
    if (existing) {
      console.log(`- ${user.name} existe deja (skip)`);
      continue;
    }
    await prisma.user.create({
      data: {
        name: user.name,
        role: user.role,
        color: user.color,
        pinHash,
      },
    });
    console.log(`+ ${user.name} (${user.role}) cree, PIN par defaut: ${DEFAULT_PIN}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
