import { auth } from "@/auth";

/**
 * Récupère l'ID de l'utilisateur connecté côté serveur (route handlers, server components).
 * Retourne null si non authentifié.
 */
export async function getCurrentUserId(): Promise<string | null> {
  const session = await auth();
  return (session?.user as any)?.id ?? null;
}

/**
 * Récupère l'utilisateur complet (id + role + name) ou null.
 */
export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user) return null;
  const u = session.user as any;
  return { id: u.id as string, name: u.name as string, role: u.role as string };
}

/**
 * Vérifie qu'un rôle est autorisé. Lance une erreur sinon.
 */
export async function requireRole(allowed: string[]) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Non authentifié");
  if (!allowed.includes(user.role)) {
    throw new Error(`Accès refusé (rôle ${user.role})`);
  }
  return user;
}
