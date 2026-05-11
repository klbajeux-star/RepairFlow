# 🎨 Guide de Design RepairFlow : Style "Premium Light"

Ce guide définit les standards visuels pour l'interface de RepairFlow. Tout agent (Accio) travaillant sur le projet doit s'y conformer pour garantir une expérience utilisateur cohérente et haut de gamme.

## 1. Philosophie "Glassmorphism"
L'interface doit paraître légère, aérienne et superposée.
- **Background Global** : `#eef4fb` (bleu givré très pâle).
- **Cartes & Conteneurs** : 
  - `bg-white/85` ou `bg-white/40` selon le niveau de profondeur.
  - `backdrop-blur-md` ou `backdrop-blur-xl`.
  - Bordures : `border border-white/80` (donne un effet de "bord brillant").
  - Ombres : Préférer des ombres diffuses et colorées : `shadow-[0_24px_60px_-35px_rgba(15,23,42,0.28)]`.

## 2. Typographie "Ultra Pro"
La hiérarchie visuelle ne se fait pas par la taille, mais par la graisse et l'espacement.
- **Titres de Section** : `text-[0.7rem] font-black uppercase tracking-[0.26em] text-slate-400`.
- **Valeurs Chiffrées** : `text-3xl font-black tracking-tight text-slate-950`.
- **Labels de Statut** : `text-[10px] font-black uppercase tracking-widest`.
- **Corps de texte** : `text-sm font-medium leading-relaxed text-slate-600`.

## 3. Système de Couleurs Sémantiques
Éviter les couleurs Tailwind par défaut sans nuances.
- **Bleu (Principal)** : `blue-600` pour les actions, `blue-50/50` pour les fonds secondaires.
- **Emeraude (Prêt/Succès)** : `emerald-600` avec fond `emerald-50`.
- **Rose (Erreur/Bloqué)** : `rose-600` avec fond `rose-50`.
- **Slate (Neutre)** : Utiliser massivement `slate-950` pour les textes importants et `slate-400` pour les secondaires.

## 4. Composants Signature
### Boutons "Premium"
- **Style** : `rounded-2xl px-6 py-3 font-bold transition-all active:scale-95`.
- **Effets** : Ajouter une ombre portée de la couleur du bouton (ex: `shadow-blue-600/10`).

### Inputs "Glass"
- **Style** : `rounded-2xl border border-slate-100 bg-white/60 py-4 px-6 outline-none transition focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-50/50`.

### Badges "BlackLabel"
- **Style** : Un badge avec un fond très clair, un texte en majuscules gras, et un petit indicateur point (`dot`) de couleur vive.
  - Exemple : `<div className="h-1.5 w-1.5 rounded-full bg-blue-600" />` + label.

## 5. Micro-Interactions
- **Hover** : Les cartes doivent avoir une légère translation vers le haut ou un changement de fond subtil (`hover:bg-white/50`).
- **Loading** : Utiliser `Loader2` de `lucide-react` avec une animation `animate-spin` douce.

## 6. Layout Kanban (Dashboard)
- Le Kanban doit utiliser `grid-cols-4` (ou 5 selon les écrans).
- Chaque colonne doit avoir un en-tête avec un badge indiquant le nombre de tickets : `bg-slate-100 text-slate-600 rounded-full px-2 py-0.5 text-[10px]`.

---
*Note : Si un composant semble trop "standard" ou "générique", appliquez un `rounded-[2rem]` et vérifiez le `tracking` du texte.*
