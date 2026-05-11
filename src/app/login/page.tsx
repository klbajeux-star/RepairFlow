"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Lock, ShieldCheck, Loader2, Delete } from "lucide-react";

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
    fetch("/api/auth/users-list")
      .then((r) => r.json())
      .then((d) => setUsers(d.users || []))
      .catch(() => setError("Impossible de charger la liste des utilisateurs"));
  }, []);

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
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 via-white to-sky-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white/70 backdrop-blur-2xl border border-white/80 rounded-[2rem] shadow-2xl shadow-slate-200/50 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Colonne gauche : sélection utilisateur */}
        <div className="p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] text-white/50 uppercase">RepairFlow</p>
              <h1 className="text-2xl font-black tracking-tight">Espace Atelier</h1>
            </div>
          </div>

          <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">
            Choisissez votre profil
          </p>

          <div className="grid grid-cols-2 gap-3">
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
                    "group relative p-4 rounded-2xl text-left transition-all border",
                    isActive
                      ? "bg-white text-slate-900 border-white shadow-xl scale-[1.02]"
                      : "bg-white/5 border-white/10 hover:bg-white/10",
                  ].join(" ")}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg mb-3"
                    style={{
                      backgroundColor: isActive ? u.color : `${u.color}33`,
                      color: isActive ? "white" : u.color,
                    }}
                  >
                    {initials(u.name)}
                  </div>
                  <p className={isActive ? "font-bold text-sm" : "font-bold text-sm text-white"}>
                    {u.name}
                  </p>
                  <p
                    className={[
                      "text-[10px] uppercase tracking-widest mt-0.5",
                      isActive ? "text-slate-500" : "text-white/40",
                    ].join(" ")}
                  >
                    {ROLE_LABELS[u.role] || u.role}
                  </p>
                </button>
              );
            })}
          </div>

          {users.length === 0 && (
            <p className="text-white/40 text-sm">Chargement...</p>
          )}
        </div>

        {/* Colonne droite : saisie PIN */}
        <div className="p-10 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-slate-400" />
            <p className="text-[10px] tracking-[0.3em] text-slate-400 uppercase">Code PIN</p>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 mb-1">
            {selected ? `Bonjour ${selected.name}` : "Veuillez vous identifier"}
          </h2>
          <p className="text-sm text-slate-500 mb-8">
            {selected
              ? "Saisissez votre code PIN à 4-6 chiffres pour continuer."
              : "Sélectionnez votre profil sur la gauche."}
          </p>

          {/* Affichage des points PIN */}
          <div className="flex justify-center gap-3 mb-8">
            {pinDots.map((filled, i) => (
              <div
                key={i}
                className={[
                  "w-4 h-4 rounded-full transition-all border-2",
                  filled
                    ? "bg-slate-900 border-slate-900 scale-110"
                    : "bg-transparent border-slate-300",
                ].join(" ")}
              />
            ))}
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm text-center">
              {error}
            </div>
          )}

          {/* Pavé numérique */}
          <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto w-full">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
              <button
                key={d}
                onClick={() => handleDigit(d)}
                disabled={!selected || loading}
                className="aspect-square rounded-2xl bg-slate-50 hover:bg-slate-100 active:bg-slate-200 border border-slate-200 text-2xl font-bold text-slate-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
              >
                {d}
              </button>
            ))}
            <button
              onClick={handleBackspace}
              disabled={!selected || loading}
              className="aspect-square rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 disabled:opacity-30"
            >
              <Delete className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleDigit("0")}
              disabled={!selected || loading}
              className="aspect-square rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-2xl font-bold text-slate-900 disabled:opacity-30 shadow-sm"
            >
              0
            </button>
            <button
              onClick={submit}
              disabled={!selected || pin.length < 4 || loading}
              className="aspect-square rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm tracking-widest uppercase disabled:opacity-30 flex items-center justify-center shadow-lg"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "OK"}
            </button>
          </div>

          <p className="text-[10px] text-slate-400 text-center mt-8 tracking-widest uppercase">
            Session sécurisée &middot; 12h
          </p>
        </div>
      </div>
    </div>
  );
}
