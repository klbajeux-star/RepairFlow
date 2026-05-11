import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Liste publique (sans PIN) des utilisateurs actifs - utilisée par la page /login
export async function GET() {
  const users = await prisma.user.findMany({
    where: { isActive: true },
    select: { id: true, name: true, role: true, color: true },
    orderBy: { name: "asc" },
  });
  return NextResponse.json({ users });
}
