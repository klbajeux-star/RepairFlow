# MEMOIRE - RepairFlow

## Projet : Logiciel de Gestion d'Atelier de Réparation (ERP/CRM)

### Stack Technique
- **Framework** : Next.js 14 (App Router)
- **Styling** : Tailwind CSS + Lucide Icons
- **Database** : SQLite avec Prisma ORM
- **Langage** : TypeScript

### Structure des Données
- **Client** : Coordonnées étendues (Nom, Prénom, Type, Tel, Email, Adresse, CP, Ville)
- **Part** : Catalogue de pièces détachées (SKU, Stock, P.A., Stock réservé)
- **Service** : Forfaits de prestations (Nom, Main d'œuvre, Pièce associée)
- **Repair** : Tickets atelier (Statut, Client, Services, Notes, Détails appareil pour BPEC)
- **RepairService** : Lignes d'intervention (Service ID, Prix fixé à l'édition, Statut de pièce/réservation)
- **ShopProduct** : Produits boutique (Accessoires, smartphones reconditionnés, prix achat HT/vente TTC, stock)
- **Quote & Invoice** : Gestion des devis et factures (Statuts, conversion devis vers facture, édition A4 dynamique, calcul des taxes). Verrouillage strict des factures après émission (statut "EMISE" ou "paid") et des devis après conversion (statut "CONVERTI").

### Préférences de Design & UX
- **Échelle globale** : Mise en page "dézoomée" (scale 0.93) dans `AppShell` pour plus de densité d'information.
- **Style Visuel** : Coins arrondis (`rounded-[2rem]`), Sidebar sombre (`slate-950`), Badges de statut colorés.
- **Facturation** : Format A4 strict requis. Les documents sont éditables dynamiquement (prix, noms de lignes, quantités) dans l'interface de facturation avant impression/export. Intégration d'un listing avec filtrage par statut (Brouillon, Signé, Converti, etc.).
- **Panneau de Conformité** : Widget visuel dans l'éditeur indiquant les erreurs bloquantes, avertissements et infos Factur-X. Une bannière "Cadenas" (Lock) signale les documents immuables.
- **Paramètres** : Page dédiée `/settings` pour la configuration légale et fiscale, accessible via la sidebar.
- **Mise en page A4 "Ultra Pro"** : Header stylisé avec logo `Wrench` revisité, footer légal complet (SIRET/TVA), et design épuré utilisant des typographies `black` et des contrastes élevés.
- **Focus Intervention** : Style "Glassmorphism" clair (`bg-slate-50/50`) avec bordures et ombres douces pour une meilleure lisibilité vs le thème sombre global. Inclusion d'un bloc de suivi commercial (Numéro et Statut du devis lié) pour une vue 360° sans quitter le dashboard.
- **Approche Hybride (Premium Light)** : Extension du style "Premium Light" (Glassmorphism clair) à l'ensemble de l'ERP pour concilier esthétique moderne et efficacité opérationnelle.
- **Documents PDF** : Génération de PDF serveur (`/api/documents/[type]/[id]/pdf`) via `pdf-lib` et `jsPDF` avec injection XML Factur-X.

### Milestones
- [2026-04-05] Initialisation du projet et déploiement des 5 modules cœurs.
- [2026-04-14] Module Stats & Suivi Pièces : Ajout d'un tableau de bord analytique complet et gestion de la disponibilité des pièces.
- [2026-04-15] Unification Dashboard & Gestion Commerciale : Synchronisation des stats et traçabilité des références ticket (`INT-XXXX`).
- [2026-04-16] Migration Backend PDF & Conformité Factur-X (Profil BASIC).
- [2026-04-17] Finalisation Multi-TVA & Données de Paiement (EN 16931-1).
- [2026-04-18] Factur-X Comfort, Validation & Verrouillage :
    - Mise à niveau vers le profil **COMFORT (EN 16931)** pour une conformité européenne totale.
    - Système de validation automatique (Front/Back) pour sécuriser l'émission des documents.
    - Implémentation du verrouillage strict des factures après émission (statut "EMISE").
    - Synchronisation visuelle "Ultra Pro" parfaite entre l'éditeur et le PDF généré.
    - Blocage de la création multiple de devis pour un même ticket atelier.
    - Ajout du bouton contextuel "Générer un Devis" dans le Dashboard.
- [2026-04-19] Sécurisation, Fluidification & Traçabilité :
    - Mise en place de l'inaltérabilité des factures `EMISE` et des devis `CONVERTI`/`SIGNE` (Front & Back).
    - Transition fluide Quote -> Invoice sans rechargement de page dans l'éditeur.
    - Ajout de l'action rapide "Nouvelle Facture" sur le Dashboard.
    - Nettoyage complet de la base de données de facturation pour tests de production.
    - Correction de l'erreur "Illegal constructor" en renommant l'icône `Lock` en `LockIcon`.
    - Simplification du workflow : Devis (Brouillon -> Envoyé -> Signé -> Converti) et Facture (Brouillon -> Émise/Payée).
    - Correction du bug de conversion : injection automatique de l'unité `C62` manquante pour la conformité EN 16931.
    - **Optimisation UI** : Suppression des boutons redondants, le bouton "Générer la Facture" n'apparaît désormais que pour les devis au statut "Signé".
    - **Souplesse Brouillon** : Relaxation de la validation Factur-X pour les factures au statut `BROUILLON` permettant la sauvegarde intermédiaire.
    - **Audit des Erreurs** : Amélioration des retours d'erreurs de l'API vers l'UI pour faciliter le débogage des échecs de conversion.
- [2026-04-20] Fiabilisation, Refonte UI, Autocomplete & Sécurité :
    - Résolution définitive du blocage "Conversion échouée" par assouplissement des règles de validation sur les brouillons.
    - Injection automatique de l'unité `C62` (standard Factur-X) au niveau API.
    - Wipe complet des données de test pour préparation à la production.
    - Création du composant `ConfirmDialog` personnalisé et remplacement de tous les `confirm()` natifs.
    - Masquage automatique des détails de tickets archivés/restitués dans le panneau latéral.
    - Intégration de l'autocomplétion d'adresse via l'API Gouv (`AddressAutocomplete`).
    - Implémentation du `DELETE` pour les clients (Backend + Frontend).
    - Ajout du support hybride PIN / Schéma de déverrouillage (Numpad layout 1-9) avec visualiseur dynamique.
- [2026-04-20] Gestion Logistique J+1 & Audit 360° :
    - Mise en place de la réservation virtuelle (Stock Réel vs Disponible).
    - Automatisation de la décrémentation des stocks lors du passage au statut `READY`.
    - Autorisation des stocks négatifs pour le suivi des pièces manquantes à la création de ticket.
    - Ajout du baromètre de commande J+1 sur le Dashboard pour le flux tendu.
    - Correction des mentions légales obligatoires sur les PDF (Forme juridique, Capital, RCS).
- [2026-04-20] UX Dashboard & Fluidité :
    - Migration des détails du ticket sélectionné du bas de page vers un SideDrawer latéral pour une vue Kanban épurée.
- [2026-04-20] Crise, Revert et Stabilisation :
    - Revert complet suite à une instabilité de la refonte UI "Ultra Pro".
    - Ré-implémentation robuste de la logique de réservation et du workflow J+1.
    - Modularisation de la facturation (`src/app/billing/components/`) pour une meilleure maintenabilité.
    - Correction des conflits de fonctions (`getPartStatusStyle`) et fiabilisation des imports.
- [2026-04-21] Refonte Ergonomique du Dashboard :
    - Remplacement définitif de l'encart bas par un **SideDrawer** latéral interactif.
    - Correction de bugs critiques d'encodage (caractères nuls) et de syntaxe (balisage JSX) dans `page.tsx`.
    - Sécurisation des icônes d'appareils via le nom du service (`repair.services[0]?.service.name`).
    - Stabilisation du Kanban original avec intégration du nouveau flux de détails.
    - **Migration 100% Finalisée** : Suppression totale de l'ancien panneau "Focus intervention" et transfert de toute la logique (Notes, Pièces, Logs, Actions) dans le SideDrawer.
- [2026-04-21] Réservation intelligente des pièces :
    - Mise à jour du schéma Prisma : ajout de `reservedQuantity` sur `Part` et `partStatus` sur `RepairService`.
    - Création du service métier transactionnel `src/lib/inventory-reservation.ts` pour gérer le cycle de vie des pièces (Réservation -> Commande -> Consommation).
    - Implémentation du calcul dynamique du stock disponible (Réel - Réservé).

### État de Conformité Légale
- **EN 16931-1 (Factur-X)** : **OPÉRATIONNEL (Profil COMFORT)**. Documents hybrides PDF/A-3 + XML 100% conformes.
- **Validation Métier** : **OPÉRATIONNEL**. Vérification de 30+ points de contrôle avant émission.
- **Multi-TVA** : **OPÉRATIONNEL**. Gestion au forfait ou au produit avec taux configurables par ligne.

### Open Items
- **Validation PDF/A-3** : Vérification stricte des métadonnées XMP via outils externes.
- **Scan Code-barres** : Optimiser l'entrée de stock en boutique par scan direct.
- **B2C/B2B Toggle** : Améliorer le sélecteur client dans la facturation pour basculer dynamiquement entre modes particulier et pro.

### Liens Utiles
- Dashboard : `/`
- Stats : `/stats`
- Réparations : `/repairs`
- Catalogue : `/inventory`
- Boutique : `/boutique`
- Services : `/services`
- Clients : `/clients`
- Facturation : `/billing`
- Paramètres : `/settings`
