import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

// Liste publique (sans PIN) des utilisateurs actifs - utilisée par la page /login
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        role: true,
        color: true,
      },
      orderBy: { name: "asc" },
    });
    return NextResponse.json(users);
  } catch (error: any) {
    console.error("[API] Error fetching public users:", error);
    return NextResponse.json(
      { error: "Erreur base de données", details: error.message },
      { status: 500 }
    );
  }
}
