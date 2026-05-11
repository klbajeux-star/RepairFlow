# 🧱 Bibliothèque de Composants RepairFlow

Ce document fournit des exemples de code pour les composants UI standards du projet. Utilisez ces snippets comme base pour garantir la cohérence visuelle.

## 1. Statut / Badge "BlackLabel"
Idéal pour les colonnes Kanban ou les étiquettes de statut.

```tsx
function StatusBadge({ label, colorClass }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-widest ${colorClass}`}>
      <div className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

// Utilisation :
// <StatusBadge label="En attente" colorClass="bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200/50" />
```

## 2. Carte de Statistique "Impact"
Utilisée en haut des pages pour afficher des KPIs.

```tsx
function StatCard({ icon, title, value, subtitle, onClick }) {
  return (
    <article 
      onClick={onClick}
      className="group cursor-pointer rounded-[2rem] border border-white/60 bg-white/40 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all hover:bg-white/60 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1"
    >
      <div className="inline-flex rounded-2xl bg-blue-50 p-3 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
        {icon}
      </div>
      <p className="mt-5 text-[0.7rem] font-black uppercase tracking-[0.26em] text-slate-400">{title}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <p className="text-3xl font-black tracking-tight text-slate-950">{value}</p>
        <p className="text-xs font-bold text-slate-500">{subtitle}</p>
      </div>
    </article>
  );
}
```

## 3. Section Title avec Icone
Pour introduire des blocs de contenu dans un Drawer ou une page.

```tsx
function SectionTitle({ icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-xl shadow-slate-900/10">
        {icon}
      </div>
      <div>
        <p className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-blue-600">{subtitle}</p>
        <h3 className="text-lg font-black tracking-tight text-slate-950">{title}</h3>
      </div>
    </div>
  );
}
```

## 4. Champ de Saisie "Crystal"
```tsx
<div className="space-y-2">
  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
    Numéro de série
  </label>
  <input 
    className="w-full rounded-2xl border border-slate-100 bg-white/60 py-4 px-6 text-sm font-semibold outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50/50"
    placeholder="Ex: IMEI..."
  />
</div>
```

---
*Astuce : Toujours utiliser des multiples de 4 pour les arrondis (`rounded-2xl`, `rounded-[2rem]`).*
