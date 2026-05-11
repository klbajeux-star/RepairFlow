import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/session";

const ALLOWED_ROLES = ["ADMIN", "TECHNICIEN", "VENDEUR"];

export async function GET() {
  try {
    await requireRole(["ADMIN"]);
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        role: true,
        isActive: true,
        color: true,
        lastLoginAt: true,
        createdAt: true,
      },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ users });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 403 });
  }
}

export async function POST(req: Request) {
  try {
    await requireRole(["ADMIN"]);
    const body = await req.json();
    const name = String(body?.name || "").trim();
    const pin = String(body?.pin || "").trim();
    const role = String(body?.role || "VENDEUR").trim();
    const color = String(body?.color || "#0ea5e9");

    if (!name) return NextResponse.json({ error: "Nom requis" }, { status: 400 });
    if (!/^\d{4,6}$/.test(pin)) {
      return NextResponse.json({ error: "PIN: 4 à 6 chiffres" }, { status: 400 });
    }
    if (!ALLOWED_ROLES.includes(role)) {
      return NextResponse.json({ error: "Rôle invalide" }, { status: 400 });
    }

    const pinHash = await bcrypt.hash(pin, 10);
    const user = await prisma.user.create({
      data: { name, role, color, pinHash },
      select: { id: true, name: true, role: true, isActive: true, color: true },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Erreur" }, { status: 400 });
  }
}
