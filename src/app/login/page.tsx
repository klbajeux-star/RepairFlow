"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Lock, ShieldCheck, Loader2, Delete, RefreshCw } from "lucide-react";

type UserCard = { id: string; name: string; role: string; color: string };

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Patron",
  TECHNICIEN: "Technicien",
  VENDEUR: "Vendeur",
};

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const callbackUrl = search.get("callbackUrl") || "/";

  const [users, setUsers] = useState<UserCard[]>([]);
  const [selected, setSelected] = useState<UserCard | null>(null);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/public-users", { cache: 'no-store' });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || `Erreur ${res.status}`);
      }
      
      if (Array.isArray(data)) {
        setUsers(data);
        if (data.length === 0) {
          setError("Aucun utilisateur actif trouvé.");
        }
      } else {
        throw new Error("Format de réponse invalide");
      }
    } catch (err: any) {
      console.error("Login users fetch failed:", err);
      setError(`Echec connexion : ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const initials = (name: string) =>
    name
      .split(" ")
      .map((p) => p[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const handleDigit = (d: string) => {
    if (pin.length >= 6) return;
    setError(null);
    setPin((p) => p + d);
  };

  const handleBackspace = () => {
    setError(null);
    setPin((p) => p.slice(0, -1));
  };

  const submit = async () => {
    if (!selected || pin.length < 4) return;
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", {
      userId: selected.id,
      pin,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("PIN incorrect");
      setPin("");
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  const pinDots = useMemo(() => Array.from({ length: 6 }, (_, i) => i < pin.length), [pin]);

  return (
    <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white/70 backdrop-blur-2xl border border-white/80 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden grid grid-cols-1 md:grid-cols-[400px_1fr]">
        
        {/* Colonne GAUCHE : Sélection de profil (Sombre) */}
        <div className="p-10 bg-slate-950 text-white flex flex-col min-h-[600px]">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] text-blue-400 uppercase font-black">RepairFlow</p>
              <h1 className="text-2xl font-black tracking-tight">Atelier</h1>
            </div>
          </div>

          <p className="text-xs uppercase tracking-[0.25em] text-slate-500 mb-6 font-bold">
            Utilisateurs
          </p>

          <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
            {users.map((u) => {
              const isActive = selected?.id === u.id;
              return (
                <button
                  key={u.id}
                  onClick={() => {
                    setSelected(u);
                    setPin("");
                    setError(null);
                  }}
                  className={[
                    "w-full group relative p-4 rounded-2xl text-left transition-all border flex items-center gap-4",
                    isActive
                      ? "bg-white text-slate-900 border-white shadow-xl scale-[1.02]"
                      : "bg-slate-900 border-slate-800 hover:bg-slate-900/50",
                  ].join(" ")}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0"
                    style={{
                      backgroundColor: isActive ? u.color : `${u.color}22`,
                      color: isActive ? "white" : u.color,
                    }}
                  >
                    {initials(u.name)}
                  </div>
                  <div>
                    <p className={isActive ? "font-bold text-sm" : "font-bold text-sm text-white"}>
                      {u.name}
                    </p>
                    <p className={isActive ? "text-[9px] font-bold text-slate-400 uppercase tracking-widest" : "text-[9px] font-bold text-slate-600 uppercase tracking-widest"}>
                      {ROLE_LABELS[u.role] || u.role}
                    </p>
                  </div>
                </button>
              );
            })}

            {loading && (
              <div className="flex items-center gap-3 text-slate-500 py-4">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Chargement...</span>
              </div>
            )}

            {users.length === 0 && !loading && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                <p className="text-rose-400 text-[10px] font-bold uppercase leading-relaxed mb-3">
                  {error || "Aucun utilisateur trouvé"}
                </p>
                <button 
                  onClick={loadUsers}
                  className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white bg-slate-800 px-3 py-2 rounded-lg hover:bg-slate-700 transition"
                >
                  <RefreshCw className="w-3 h-3" />
                  Réessayer
                </button>
              </div>
            )}
          </div>

          <div className="mt-10 pt-8 border-t border-slate-900">
            <p className="text-[9px] text-slate-700 font-bold uppercase tracking-[0.2em]">
              Propulsé par Momuy&Tech
            </p>
          </div>
        </div>

        {/* Colonne DROITE : Saisie PIN (Clair) */}
        <div className="p-10 flex flex-col justify-center bg-slate-50/30">
          <div className="max-w-sm mx-auto w-full">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4 text-slate-400" />
              <p className="text-[10px] tracking-[0.3em] text-slate-400 font-black uppercase">Sécurité</p>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-950 mb-1">
              {selected ? `Salut ${selected.name.split(' ')[0]}` : "Identification"}
            </h2>
            <p className="text-sm font-medium text-slate-500 mb-10">
              {selected
                ? "Entre ton code PIN pour ouvrir ta session."
                : "Choisis ton profil sur la gauche pour commencer."}
            </p>

            {/* Points PIN */}
            <div className="flex justify-center gap-4 mb-10">
              {pinDots.map((filled, i) => (
                <div
                  key={i}
                  className={[
                    "w-3.5 h-3.5 rounded-full transition-all border-2",
                    filled
                      ? "bg-slate-950 border-slate-950 scale-125 shadow-lg shadow-slate-950/20"
                      : "bg-transparent border-slate-200",
                  ].join(" ")}
                />
              ))}
            </div>

            {error && !loading && users.length > 0 && (
              <div className="mb-6 px-4 py-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold text-center">
                {error}
              </div>
            )}

            {/* Pavé numérique */}
            <div className="grid grid-cols-3 gap-3">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
                <button
                  key={d}
                  onClick={() => handleDigit(d)}
                  disabled={!selected || loading}
                  className="aspect-square rounded-2xl bg-white hover:bg-slate-50 active:scale-95 border border-slate-100 text-2xl font-black text-slate-900 shadow-sm flex items-center justify-center disabled:opacity-20"
                >
                  {d}
                </button>
              ))}
              <button
                onClick={handleBackspace}
                disabled={!selected || loading}
                className="aspect-square rounded-2xl bg-white hover:bg-slate-50 active:scale-95 border border-slate-100 flex items-center justify-center text-slate-400 disabled:opacity-20 shadow-sm"
              >
                <Delete className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleDigit("0")}
                disabled={!selected || loading}
                className="aspect-square rounded-2xl bg-white hover:bg-slate-50 active:scale-95 border border-slate-100 text-2xl font-black text-slate-900 shadow-sm flex items-center justify-center disabled:opacity-20"
              >
                0
              </button>
              <button
                onClick={submit}
                disabled={!selected || pin.length < 4 || loading}
                className="aspect-square rounded-2xl bg-slate-950 hover:bg-slate-900 active:scale-95 text-white font-black text-xs tracking-widest uppercase shadow-xl shadow-slate-900/20 flex items-center justify-center disabled:opacity-20"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin text-blue-400" /> : "Entrer"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
