"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Plus, KeyRound, Power, ShieldCheck, X, Users } from "lucide-react";

type AdminUser = {
  id: string;
  name: string;
  role: string;
  isActive: boolean;
  color: string;
  lastLoginAt?: string | null;
};

const ROLES = [
  { value: "ADMIN", label: "Patron (accès total)" },
  { value: "TECHNICIEN", label: "Technicien (atelier + stock)" },
  { value: "VENDEUR", label: "Vendeur (boutique + tickets)" },
];

const COLORS = ["#0f172a", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [editPin, setEditPin] = useState<AdminUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [form, setForm] = useState({ name: "", pin: "", role: "VENDEUR", color: COLORS[1] });
  const [newPin, setNewPin] = useState("");

  const role = (session?.user as any)?.role;
  const isAdmin = role === "ADMIN";

  const load = async () => {
    setLoading(true);
    const r = await fetch("/api/admin/users");
    const d = await r.json();
    setUsers(d.users || []);
    setLoading(false);
  };

  useEffect(() => {
    if (status === "authenticated" && isAdmin) load();
  }, [status, isAdmin]);

  if (status === "loading") return <div className="p-10 text-slate-500">Chargement...</div>;
  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl border border-red-200 shadow-lg text-center">
        <ShieldCheck className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-900 mb-1">Accès refusé</h2>
        <p className="text-sm text-slate-600">Cette page est réservée aux administrateurs.</p>
      </div>
    );
  }

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const r = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!r.ok) {
      const d = await r.json();
      setError(d.error || "Erreur");
      return;
    }
    setShowCreate(false);
    setForm({ name: "", pin: "", role: "VENDEUR", color: COLORS[1] });
    load();
  };

  const toggleActive = async (u: AdminUser) => {
    await fetch(`/api/admin/users/${u.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !u.isActive }),
    });
    load();
  };

  const resetPin = async () => {
    if (!editPin) return;
    setError(null);
    const r = await fetch(`/api/admin/users/${editPin.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin: newPin }),
    });
    if (!r.ok) {
      const d = await r.json();
      setError(d.error || "Erreur");
      return;
    }
    setEditPin(null);
    setNewPin("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-blue-600">
            Administration
          </p>
          <h1 className="text-2xl font-black tracking-tight text-slate-950 flex items-center gap-3">
            <Users className="w-6 h-6" />
            Utilisateurs
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Gérez les accès de votre équipe (boutique + atelier).
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg hover:bg-slate-800 transition"
        >
          <Plus className="w-4 h-4" />
          Nouvel utilisateur
        </button>
      </div>

      <div className="rounded-[2rem] border border-white/70 bg-white/60 backdrop-blur-md shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-slate-500">Chargement...</div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr className="text-left text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500">
                <th className="px-6 py-4">Utilisateur</th>
                <th className="px-6 py-4">Rôle</th>
                <th className="px-6 py-4">Dernière connexion</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => {
                const initials = u.name
                  .split(" ")
                  .map((p) => p[0])
                  .filter(Boolean)
                  .slice(0, 2)
                  .join("")
                  .toUpperCase();
                return (
                  <tr key={u.id} className="hover:bg-slate-50/40">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black text-white"
                          style={{ backgroundColor: u.color }}
                        >
                          {initials}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{u.name}</p>
                          <p className="text-xs text-slate-500">ID: {u.id.slice(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-widest bg-slate-100 text-slate-700">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {u.lastLoginAt
                        ? new Date(u.lastLoginAt).toLocaleString("fr-FR")
                        : "Jamais"}
                    </td>
                    <td className="px-6 py-4">
                      {u.isActive ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" /> Actif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                          <span className="w-2 h-2 rounded-full bg-slate-300" /> Désactivé
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => {
                            setEditPin(u);
                            setNewPin("");
                          }}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition"
                        >
                          <KeyRound className="w-3.5 h-3.5" />
                          Reset PIN
                        </button>
                        <button
                          onClick={() => toggleActive(u)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition"
                        >
                          <Power className="w-3.5 h-3.5" />
                          {u.isActive ? "Désactiver" : "Activer"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal création */}
      {showCreate && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={create}
            className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-8 border border-white/80"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-slate-900">Nouvel utilisateur</h3>
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Nom
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  placeholder="Ex: Jean Dupont"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  PIN (4-6 chiffres)
                </label>
                <input
                  required
                  type="text"
                  inputMode="numeric"
                  pattern="\d{4,6}"
                  value={form.pin}
                  onChange={(e) => setForm({ ...form, pin: e.target.value.replace(/\D/g, "") })}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-slate-900"
                  placeholder="123456"
                  maxLength={6}
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Rôle
                </label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Couleur
                </label>
                <div className="mt-2 flex gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setForm({ ...form, color: c })}
                      className={[
                        "w-8 h-8 rounded-xl transition",
                        form.color === c ? "ring-2 ring-offset-2 ring-slate-900 scale-110" : "",
                      ].join(" ")}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              {error && (
                <div className="px-3 py-2 rounded-lg bg-red-50 text-red-700 text-xs">{error}</div>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-slate-950 py-3 text-sm font-bold text-white hover:bg-slate-800 transition"
              >
                Créer le compte
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal reset PIN */}
      {editPin && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-[2rem] shadow-2xl p-8 border border-white/80">
            <h3 className="text-xl font-black text-slate-900 mb-2">Nouveau PIN</h3>
            <p className="text-sm text-slate-500 mb-4">
              Pour {editPin.name}. Communiquez-lui le nouveau code.
            </p>
            <input
              type="text"
              inputMode="numeric"
              pattern="\d{4,6}"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ""))}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-lg font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-slate-900 text-center"
              placeholder="••••••"
              maxLength={6}
              autoFocus
            />
            {error && (
              <div className="mt-3 px-3 py-2 rounded-lg bg-red-50 text-red-700 text-xs">
                {error}
              </div>
            )}
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => {
                  setEditPin(null);
                  setNewPin("");
                  setError(null);
                }}
                className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Annuler
              </button>
              <button
                onClick={resetPin}
                disabled={newPin.length < 4}
                className="flex-1 rounded-xl bg-slate-950 py-2.5 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-30"
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
