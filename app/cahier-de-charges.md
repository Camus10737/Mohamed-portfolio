# CAHIER DES CHARGES
## Portfolio Freelance — Mohamed Camara
**Développeur web & solutions numériques**
*Version 1.0 — Québec City, 2025*

---

> **📋 DOCUMENT DESTINÉ À CLAUDE CODE**
> Ce document est un cahier des charges complet, prêt à être collé dans Claude Code. Toutes les décisions techniques et de design ont déjà été prises. Claude Code doit implémenter exactement ce qui est décrit, sans demander de précisions supplémentaires, sauf ambiguïté technique critique.

---

## 1. Contexte & Objectif

Mohamed Camara est développeur web freelance basé à Québec City. Sa stratégie commerciale consiste à prospecter des commerces locaux (salons de coiffure, garages, restaurants, boutiques) qui n'ont pas de présence en ligne, et à leur proposer ses services de façon professionnelle.

**Objectifs du portfolio :**
- Servir de carte de visite numérique — le lien figure sur une carte de visite physique avec QR code
- Être présenté en personne sur tablette ou téléphone lors de visites chez des prospects
- Démontrer le niveau de qualité que Mohamed peut livrer à ses clients
- Permettre à Mohamed de mettre à jour ses projets sans toucher au code

---

## 2. Stack Technique

| Élément | Choix |
|---|---|
| Framework | Next.js 14 (App Router) |
| Langage | TypeScript |
| Styles | Tailwind CSS |
| Animations | Framer Motion |
| Formulaire contact | Resend (gratuit jusqu'à 100 emails/jour) |
| Stockage projets | Fichier JSON local (`data/projects.json`) |
| Auth admin | Middleware Next.js + variable d'environnement (mot de passe hashé bcrypt) |
| Déploiement | Vercel (gratuit) |
| Repository | GitHub (privé) |

> 💡 Utiliser exclusivement ces technologies. Ne pas ajouter de base de données externe, Prisma, ou Supabase. Le site doit rester simple et maintenable.

---

## 3. Architecture des Fichiers

```
portfolio-mohamed/
├── app/
│   ├── page.tsx                  ← Page principale (portfolio public)
│   ├── layout.tsx                ← Layout global + métadonnées SEO
│   ├── admin/
│   │   ├── page.tsx              ← Dashboard admin (protégé)
│   │   └── login/page.tsx        ← Page de connexion admin
│   └── api/
│       ├── projects/route.ts     ← GET / POST / PUT / DELETE projets
│       └── contact/route.ts      ← Envoi email via Resend
├── components/
│   ├── sections/                 ← Hero, About, Services, Projects...
│   └── ui/                       ← Boutons, cards, badges réutilisables
├── data/
│   └── projects.json             ← Données des projets (source de vérité)
├── public/
│   └── projects/                 ← Images des projets uploadées
├── .env.local                    ← RESEND_API_KEY, ADMIN_PASSWORD_HASH
└── middleware.ts                 ← Protection route /admin
```

---

## 4. Design & Identité Visuelle

### 4.1 Palette de couleurs

| Rôle | Couleur | HEX |
|---|---|---|
| Fond principal | Blanc pur | `#FFFFFF` |
| Fond alternatif sections | Gris très clair | `#F9FAFB` |
| Couleur primaire (titres) | Bleu marine foncé | `#1E3A5F` |
| Couleur secondaire (CTA) | Bleu électrique | `#2563EB` |
| Texte principal | Gris anthracite | `#1F2937` |
| Texte secondaire | Gris moyen | `#6B7280` |
| Fond Hero | Dégradé | `#0F172A → #1E3A5F` |

### 4.2 Typographie

| Usage | Police | Taille / Style |
|---|---|---|
| Titres H1 | Inter | 3.5rem, bold 800 |
| Sous-titres H2 | Inter | 2rem, bold 700 |
| Titres de cartes H3 | Inter | 1.25rem, bold 600 |
| Corps de texte | Inter | 1rem, regular 400 |
| Labels / badges | Inter | 0.75rem, medium 500 |

### 4.3 Style général

- Design épuré, moderne, professionnel — inspiré de portfolios tech haut de gamme
- Coins arrondis (`border-radius: 12–16px`) sur les cartes et boutons
- Ombres douces (`shadow-lg`) pour les cartes de projets
- Animations au scroll : fade-in + slide-up (Framer Motion, durée 0.5s)
- Hover effects sur les projets : légère élévation + overlay avec CTA
- Mobile-first — entièrement responsive (320px à 1440px+)
- Mode clair uniquement (pas de dark mode)

---

## 5. Sections du Portfolio

> 💡 Toutes les sections sont sur une seule page (one-page scroll). La navigation sticky en haut permet de sauter à chaque section. Ordre des sections tel que listé ci-dessous.

---

### 5.1 Section Hero

La section la plus importante — premier écran visible, doit accrocher immédiatement.

| Élément | Détail |
|---|---|
| Fond | Dégradé sombre `#0F172A → #1E3A5F` + particules légères animées |
| Hauteur | 100vh (plein écran) |
| Badge | « Disponible pour nouveaux projets » (pastille verte pulsante) |
| Titre H1 | « Bonjour, je suis Mohamed Camara » |
| Sous-titre | « Développeur web freelance — Je crée la présence numérique de votre entreprise » |
| Description | « Basé à Québec City, j'aide les PME locales à se lancer en ligne avec des sites web professionnels et des outils numériques sur mesure. » |
| CTA principal | Bouton bleu : « Voir mes réalisations » (scroll vers `#projets`) |
| CTA secondaire | Bouton outline blanc : « Me contacter » (scroll vers `#contact`) |
| Bas de section | Flèche animée (bounce) invitant à scroller |

---

### 5.2 Section À propos

| Élément | Détail |
|---|---|
| ID | `#a-propos` |
| Layout | 2 colonnes : texte à gauche, stats + compétences à droite |
| Titre | « À propos de moi » |
| Paragraphe 1 | « Je suis Mohamed Camara, développeur web freelance passionné basé à Québec City. Je me spécialise dans la création de solutions numériques pour les entreprises locales qui souhaitent établir ou améliorer leur présence en ligne. » |
| Paragraphe 2 | « Mon approche est simple : je prends le temps de comprendre votre business avant d'écrire la première ligne de code. Chaque projet est unique, et chaque solution doit l'être aussi. » |
| Stats (droite) | 3 chiffres animés : `[X]+` Projets livrés / `[X]+` Clients satisfaits / `[X]+` Années d'expérience — **TODO : Mohamed remplacera via le JSON** |
| Compétences | Badges : React, Next.js, TypeScript, Node.js, PostgreSQL, Tailwind CSS, Figma, WordPress |

---

### 5.3 Section Services

| Élément | Détail |
|---|---|
| ID | `#services` |
| Fond | Gris très clair `#F9FAFB` |
| Layout | Grille 3 colonnes (desktop) / 1 colonne (mobile) |
| Titre | « Ce que je fais pour vous » |
| Sous-titre | « Des solutions numériques concrètes, adaptées aux PME québécoises » |

**6 cartes de services :**

| Icône | Titre | Description | Détail |
|---|---|---|---|
| 🌐 | Site vitrine | Votre entreprise mérite d'être trouvée en ligne | Design moderne, mobile, SEO de base, livraison en 5–10 jours |
| 🛒 | E-commerce | Vendez vos produits 24h/24, 7j/7 | Catalogue produits, panier, paiement Stripe / PayPal |
| 📅 | Système de réservation | Fini les appels pour les rendez-vous | Idéal salons, garages, cliniques — réservation en ligne automatique |
| 📊 | Tableau de bord interne | Gérez votre business en un clic | Suivi clients, inventaire, rapports — accès sécurisé |
| 🔄 | Refonte de site | Votre vieux site vous fait honte ? | Modernisation complète, même contenu, nouveau look |
| ⚡ | Maintenance & support | Je reste disponible après la livraison | Mises à jour, corrections, évolutions — forfait mensuel |

---

### 5.4 Section Pourquoi moi

| Élément | Détail |
|---|---|
| ID | `#pourquoi-moi` |
| Fond | Bleu marine `#1E3A5F`, texte blanc — section de rupture visuelle |
| Titre | « Pourquoi choisir Mohamed ? » |
| Layout | 4 arguments en grille 2×2 avec icônes |

**Arguments :**
- 🎯 **Local & disponible** — Basé à Québec City, je me déplace pour vous rencontrer
- ⚡ **Livraison rapide** — Un site vitrine livré en 5 à 10 jours ouvrables
- 💬 **Communication claire** — Pas de jargon technique, je vous explique tout
- 🔧 **Suivi après livraison** — Je ne disparais pas après le lancement

---

### 5.5 Section Projets / Réalisations

| Élément | Détail |
|---|---|
| ID | `#projets` |
| Fond | Blanc |
| Titre | « Mes réalisations » |
| Sous-titre | « Des projets concrets, livrés à des clients réels » |
| Layout | Grille 3 col (desktop) / 2 col (tablette) / 1 col (mobile) |
| Filtres | Boutons : Tous / Site vitrine / E-commerce / Système interne / Application |
| Animation filtre | Transition fluide Framer Motion (`AnimatePresence`) |
| Source des données | Lecture depuis `data/projects.json` — dynamique |
| CTA section | Bouton « Discutons de votre projet » → scroll `#contact` |

**Structure d'une carte projet :**
- Image de couverture (ratio 16:9, lazy loading)
- Badge catégorie (ex : « Site vitrine »)
- Titre du projet
- Description courte (2 lignes max)
- Stack technique (badges : React, Next.js, etc.)
- Boutons : « Voir le site » (lien externe) + « Détails » (modale)

**Projets à prépopuler dans `projects.json` :**

> 💡 Mohamed ajoutera ses 2 vrais projets + 3 fictifs via le panel admin. Créer ces 3 entrées placeholder pour la démo initiale.

| Titre | Catégorie | Description | Stack |
|---|---|---|---|
| Coiffure Élégance Québec | Site vitrine | Site vitrine pour salon de coiffure avec galerie et formulaire de contact | Next.js, Tailwind, Vercel |
| GarageMax Québec | Site vitrine | Site pro pour garage automobile avec devis en ligne | Next.js, Tailwind, Resend |
| Chez Marcel — Restaurant | Site vitrine + réservation | Menu en ligne, réservation de table, galerie photos | Next.js, Tailwind, Framer Motion |

---

### 5.6 Section Parcours / CV

| Élément | Détail |
|---|---|
| ID | `#parcours` |
| Fond | Gris très clair `#F9FAFB` |
| Layout | Timeline verticale — alternée gauche/droite (desktop), colonne (mobile) |
| Titre | « Mon parcours » |
| Contenu | **TODO : Mohamed remplira ses vraies expériences.** Créer une structure avec 3 entrées fictives cohérentes pour la démo. |

**Structure d'une entrée timeline :**
- Année / période
- Titre du poste ou de la formation
- Organisation / école
- Description courte (2–3 lignes)

---

### 5.7 Section Contact

| Élément | Détail |
|---|---|
| ID | `#contact` |
| Fond | Blanc |
| Layout | 2 colonnes : infos à gauche, formulaire à droite |
| Titre | « Parlons de votre projet » |
| Sous-titre | « Un café virtuel ou en personne à Québec City, c'est parti ! » |

**Colonne gauche :**
- 📧 `contact@mohamedcamara.ca` *(TODO : Mohamed remplacera)*
- 📍 Québec City, QC, Canada
- 🟢 « Disponible pour nouveaux projets »
- ⏱ « Je réponds sous 24h »

**Formulaire (colonne droite) :**
- Nom complet *(required)*
- Email *(required, validation)*
- Nom de votre entreprise *(optionnel)*
- Type de projet *(select : Site vitrine / E-commerce / Réservation / Système interne / Autre)*
- Décrivez votre projet *(textarea, required, min 20 caractères)*
- Bouton « Envoyer le message » avec spinner loading
- Toast succès / erreur après envoi
- Envoi via `/api/contact` → Resend → email à `contact@mohamedcamara.ca`

---

## 6. Navigation

| Élément | Détail |
|---|---|
| Type | Navbar sticky — se cache au scroll vers le bas, réapparaît au scroll vers le haut |
| Logo | « MC » stylisé à gauche (initiales dans un carré bleu) |
| Liens | À propos / Services / Projets / Parcours / Contact |
| CTA navbar | Bouton « Me contacter » (bleu) → scroll `#contact` |
| Mobile | Menu hamburger → drawer latéral |
| Fond | Blanc avec légère ombre au scroll (`shadow-sm`) |
| Lien admin | Aucun lien visible vers `/admin` dans la navbar publique |

---

## 7. Panneau d'Administration

> 💡 Le panel admin permet à Mohamed de gérer ses projets sans toucher au code. Accès via l'URL directe `/admin` — aucun lien public vers cette page.

### 7.1 Authentification

- Route `/admin/login` — formulaire mot de passe unique
- Mot de passe stocké en variable d'environnement (`ADMIN_PASSWORD_HASH`, hashé bcrypt)
- Session via cookie `httpOnly` sécurisé (7 jours)
- Middleware Next.js protège toutes les routes `/admin/*`
- Bouton « Se déconnecter » dans le panel

### 7.2 Fonctionnalités du Dashboard

| Fonctionnalité | Description |
|---|---|
| Liste des projets | Tableau : titre, catégorie, statut (visible/caché), actions |
| Ajouter un projet | Formulaire : titre, description, catégorie, stack, URL, upload image, ordre |
| Modifier un projet | Même formulaire pré-rempli |
| Supprimer un projet | Confirmation modale avant suppression |
| Masquer / afficher | Toggle pour mettre un projet en brouillon sans le supprimer |
| Upload image | Upload vers `/public/projects/` — preview avant sauvegarde |
| Stats rapides | Nb de projets / Nb de messages reçus |

### 7.3 Structure `projects.json`

```json
{
  "id": "uuid-unique",
  "title": "Coiffure Élégance Québec",
  "slug": "coiffure-elegance-quebec",
  "category": "site-vitrine",
  "description": "Site vitrine pour salon de coiffure...",
  "longDescription": "Description complète pour la modale...",
  "stack": ["Next.js", "Tailwind CSS", "Vercel"],
  "image": "/projects/coiffure-elegance.jpg",
  "url": "https://exemple.com",
  "featured": true,
  "visible": true,
  "order": 1,
  "createdAt": "2025-01-15"
}
```

---

## 8. SEO & Performance

### 8.1 Métadonnées

- **Titre :** « Mohamed Camara — Développeur web freelance à Québec City »
- **Description :** « Développeur web freelance à Québec City. Je crée des sites web professionnels et des solutions numériques pour les PME locales. Devis gratuit. »
- Open Graph pour partage réseaux sociaux (image, titre, description)
- Favicon : initiales « MC » générées en SVG
- Langue : `fr-CA`

### 8.2 Performance

- Images : `next/image` avec lazy loading et formats WebP
- Fonts : `next/font` (Inter — pas de requête externe)
- Score Lighthouse cible : **90+** sur toutes les métriques
- Animations désactivées si `prefers-reduced-motion`

---

## 9. Variables d'Environnement

Fichier `.env.local` à créer :

```env
# Resend (envoi d'emails)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Email de destination des messages de contact
CONTACT_EMAIL=contact@mohamedcamara.ca

# Mot de passe admin (hashé avec bcrypt, rounds: 10)
ADMIN_PASSWORD_HASH=$2b$10$xxxxxxxxxxxxxxxxxxxxx

# Secret pour les cookies de session
SESSION_SECRET=une-chaine-aleatoire-de-32-caracteres-minimum
```

> 💡 Créer également un fichier `.env.example` avec les mêmes clés mais sans valeurs, pour guider Mohamed lors du déploiement sur Vercel.

---

## 10. Instructions de Déploiement

Étapes pour Mohamed après livraison du code :

1. Créer un compte **Vercel** sur vercel.com (gratuit)
2. Connecter le repository GitHub au projet Vercel
3. Ajouter les variables d'environnement dans Vercel → Settings → Environment Variables
4. Créer un compte **Resend** sur resend.com (gratuit, 100 emails/jour)
5. Acheter le domaine sur **Namecheap** ou **Porkbun** (ex : `mohamedcamara.ca` ~15$/an)
6. Connecter le domaine personnalisé dans Vercel → Domains
7. Configurer l'email pro sur **Zoho Mail** (gratuit) ou Google Workspace (~3$/mois)
8. Aller sur `/admin/login` pour définir le premier mot de passe admin
9. Ajouter ses vrais projets via le panel admin
10. Générer le QR code du site (qr-code-generator.com) pour la carte de visite

---

## 11. Instructions Spécifiques pour Claude Code

> ⚠️ **Lire attentivement avant de commencer**

- Implémenter toutes les sections dans l'ordre décrit au point 5
- Commencer par la structure Next.js, puis les composants UI de base, puis les sections dans l'ordre
- `data/projects.json` est la **source de vérité unique** pour les projets
- Le panel admin lit et écrit dans ce même fichier via l'API route
- Les placeholders (stats, expériences, vrais projets) doivent être marqués avec des commentaires `// TODO` dans le code
- Générer un `README.md` clair : comment lancer en local, comment ajouter des projets
- TypeScript strict — **pas de `any`**
- Chaque composant dans son propre fichier
- **Pas de librairie UI externe** (pas de shadcn, pas de MUI) — Tailwind pur uniquement
- Icônes : `lucide-react` uniquement
- Vérifier que `next build` passe sans erreur avant de terminer

---

*— Fin du cahier des charges —*
*Portfolio Mohamed Camara — Québec City — 2025*