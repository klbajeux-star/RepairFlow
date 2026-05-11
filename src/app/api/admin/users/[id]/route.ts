import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/session";

const ALLOWED_ROLES = ["ADMIN", "TECHNICIEN", "VENDEUR"];

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const me = await requireRole(["ADMIN"]);
    const { id } = await context.params;
    const body = await req.json();

    const data: any = {};
    if (typeof body.name === "string" && body.name.trim()) data.name = body.name.trim();
    if (typeof body.role === "string" && ALLOWED_ROLES.includes(body.role)) data.role = body.role;
    if (typeof body.color === "string") data.color = body.color;
    if (typeof body.isActive === "boolean") {
      // Empêcher de se désactiver soi-même
      if (!body.isActive && id === me.id) {
        return NextResponse.json(
          { error: "Vous ne pouvez pas vous désactiver vous-même" },
          { status: 400 }
        );
      }
      data.isActive = body.isActive;
    }
    if (typeof body.pin === "string" && body.pin.length > 0) {
      if (!/^\d{4,6}$/.test(body.pin)) {
        return NextResponse.json({ error: "PIN: 4 à 6 chiffres" }, { status: 400 });
      }
      data.pinHash = await bcrypt.hash(body.pin, 10);
    }

    const user = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, name: true, role: true, isActive: true, color: true },
    });
    return NextResponse.json(user);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Erreur" }, { status: 400 });
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const me = await requireRole(["ADMIN"]);
    const { id } = await context.params;
    if (id === me.id) {
      return NextResponse.json(
        { error: "Vous ne pouvez pas supprimer votre propre compte" },
        { status: 400 }
      );
    }
    // Soft-delete : on désactive plutôt que supprimer (préserve la traçabilité)
    await prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Erreur" }, { status: 400 });
  }
}
