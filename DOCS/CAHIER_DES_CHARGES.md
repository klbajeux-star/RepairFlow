# 📘 Cahier des Charges - RepairFlow ERP/CRM

**Projet** : Système de gestion intégré pour atelier de réparation et boutique.  
**Version** : 1.0 (Révision Pré-Ouverture)  
**Date de reprise** : 2 Mai 2026  
**Deadline Ouverture Boutique** : Mi-Septembre 2026

---

## 1. État des Lieux (Audit du 27 Avril 2026)

### 🏗️ Architecture Technique
- **Framework** : Next.js 14/15 (App Router).
- **Base de données** : SQLite gérée par Prisma ORM.
- **Client Prisma** : Isolé dans `src/generated/client` pour éviter les conflits Windows (EPERM).
- **Design System** : Identité "Premium Light" (Glassmorphism) définie dans `DOCS/DESIGN_GUIDELINES.md`.
- **Équipe IA** : 13 "Skills" installées couvrant le Fullstack, l'UI/UX, la Performance, et la Sécurité.

### ✅ Fonctionnalités Déjà Implémentées
- **Dashboard Kanban** : Gestion visuelle des tickets de réparation.
- **SideDrawer (Quick Flow)** : Consultation et modification rapide des détails d'un ticket (Prestations, Notes, Historique).
- **Gestion Client** : Création/Recherche avec autocomplétion d'adresse via l'API Gouv (BAN).
- **Sécurité Appareil** : Support du Schéma de déverrouillage (Pattern Lock) pour les dépôts.
- **Module Facturation (Beta)** : Génération de factures et devis.
- **Conformité Factur-X** : Export initial au format EN 16931 Profil COMFORT.
- **Historisation (RepairLogs)** : Traçabilité complète des changements de statut.

---

## 2. Objectifs & Améliorations à venir (Roadmap Mai-Septembre)

### 🛒 Pôle Boutique & POS (Priorité Haute)
- **Module Caisse (POS)** : Interface ultra-rapide pour la vente directe au comptoir.
- **Gestion des Stocks** : 
  - Différenciation entre "Stock Atelier" et "Stock Boutique".
  - Alertes de stock bas.
  - Inventaire tournant.
- **Matériel (Hardware)** :
  - Intégration de scanner code-barres (USB/Bluetooth).
  - Impression d'étiquettes produits (Brother/Dymo).
  - Impression de tickets de caisse (ESC/POS).

### 🛠️ Pôle Atelier (Optimisation)
- **Réservation Intelligente** : Finaliser le système de réservation virtuelle des pièces lors de la création du ticket.
- **Photos & Diagnostic** : Possibilité d'attacher des photos de l'état de l'appareil à la réception.
- **Suivi Client** : Notifications (SMS/Email) automatiques lors du passage au statut "PRÊT".

### ⚖️ Pôle Financier & Conformité
- **Certification Factur-X** : Validation stricte des métadonnées XML et XMP pour le format PDF/A-3.
- **Clôture de Caisse** : Génération de rapports X et Z journaliers.
- **Statistiques** : Dashboard de rentabilité (Marge par produit, CA par technicien).

---

## 3. Matériel & Équipement cible
*Pour l'ouverture de mi-septembre, le logiciel doit supporter :*
- **Écrans** : Optimisation pour tablettes 10" (comptoir) et moniteurs 27" (atelier).
- **Scanning** : Lecteurs 1D/2D HID.
- **Invoicing** : Imprimante A4 standard (Factures) + Imprimante thermique 80mm (Tickets).

---

## 4. Stratégie de Développement (Mai 2026)
Le 2 mai, nous attaquerons par le **Sprint "Robustesse"** :
1. Audit complet du schéma de données pour supporter le multi-stock.
2. Mise en place des tests unitaires sur le calcul de la TVA et des marges.
3. Premier prototype de l'interface POS.

---
*Ce document servira de référence unique pour tous les agents intervenant sur le projet.*
