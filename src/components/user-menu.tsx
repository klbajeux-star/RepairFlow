"use client";

import { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { ChevronDown, LogOut, RefreshCw, ShieldCheck } from "lucide-react";

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Patron",
  TECHNICIEN: "Technicien",
  VENDEUR: "Vendeur",
};

const INACTIVITY_LIMIT_MS = 30 * 60 * 1000; // 30 minutes

export function UserMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Auto-lock après inactivité
  useEffect(() => {
    if (status !== "authenticated") return;
    let timer: ReturnType<typeof setTimeout>;
    const reset = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        signOut({ callbackUrl: "/login" });
      }, INACTIVITY_LIMIT_MS);
    };
    const events = ["mousemove", "keydown", "click", "touchstart"];
    events.forEach((e) => window.addEventListener(e, reset));
    reset();
    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, [status]);

  // Fermeture menu au clic extérieur
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  if (status !== "authenticated" || !session?.user) return null;

  const user = session.user as any;
  const initials = (user.name || "?")
    .split(" ")
    .map((p: string) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/50 px-3 py-2 ring-1 ring-white/60 backdrop-blur-sm hover:bg-white/80 transition shadow-sm"
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white shadow-md"
          style={{ backgroundColor: user.color || "#0ea5e9" }}
        >
          {initials}
        </div>
        <div className="hidden lg:block text-left mr-2">
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-slate-400 leading-none mb-1">
            {ROLE_LABELS[user.role] || user.role}
          </p>
          <p className="text-sm font-black tracking-tight text-slate-950 leading-none">{user.name}</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-72 rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden z-[100] animate-in fade-in zoom-in duration-200 origin-top-right">
          <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-slate-400">
              Session active
            </p>
            <div className="flex items-center gap-3 mt-2">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white shadow-sm"
                style={{ backgroundColor: user.color || "#0ea5e9" }}
              >
                {initials}
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 leading-none">{user.name}</p>
                <p className="text-xs font-semibold text-slate-500 mt-1">{ROLE_LABELS[user.role] || user.role}</p>
              </div>
            </div>
          </div>

          {user.role === "ADMIN" && (
            <a
              href="/admin/users"
              className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition"
            >
              <ShieldCheck className="w-4 h-4 text-slate-500" />
              Gérer les utilisateurs
            </a>
          )}

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition"
          >
            <RefreshCw className="w-4 h-4 text-slate-500" />
            Changer d'utilisateur
          </button>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition border-t border-slate-100"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}
