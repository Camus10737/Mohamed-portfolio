# Portfolio — Mohamed Camara

Portfolio freelance one-page pour Mohamed Camara, développeur web freelance à Québec City.

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4**
- **Framer Motion** (animations)
- **Resend** (emails de contact)
- **bcryptjs** + **jose** (authentification admin)

---

## Lancer en local

### 1. Cloner le repo

```bash
git clone https://github.com/mohamedcamara/portfolio.git
cd portfolio
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Copier `.env.example` vers `.env.local` et remplir les valeurs :

```bash
cp .env.example .env.local
```

```env
RESEND_API_KEY=re_xxxxx         # Clé API depuis resend.com
CONTACT_EMAIL=contact@tonemail.ca
ADMIN_PASSWORD_HASH=$2b$10$...  # Généré via la commande ci-dessous
SESSION_SECRET=ta-chaine-de-32-caracteres-minimum
```

### 4. Générer le hash du mot de passe admin

```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('TON_MOT_DE_PASSE', 10).then(console.log)"
```

Copier le résultat dans `ADMIN_PASSWORD_HASH` dans `.env.local`.

### 5. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## Gestion des projets (panel admin)

1. Accéder à `/admin/login`
2. Entrer le mot de passe défini lors de la configuration
3. Ajouter, modifier, masquer ou supprimer des projets depuis le tableau de bord

Les projets sont stockés dans `data/projects.json`.

---

## Structure des fichiers

```
├── app/
│   ├── page.tsx                  ← Page principale (portfolio public)
│   ├── layout.tsx                ← Layout global + SEO
│   ├── admin/
│   │   ├── page.tsx              ← Dashboard admin (protégé)
│   │   └── login/page.tsx        ← Connexion admin
│   └── api/
│       ├── projects/route.ts     ← CRUD projets
│       ├── contact/route.ts      ← Envoi email via Resend
│       ├── upload/route.ts       ← Upload images
│       └── auth/
│           ├── login/route.ts
│           └── logout/route.ts
├── components/
│   ├── sections/                 ← Sections de la page (Navbar, Hero, etc.)
│   └── ui/                       ← Composants réutilisables
├── data/
│   └── projects.json             ← Source de vérité des projets
├── lib/
│   ├── auth.ts                   ← Helpers session JWT
│   └── projects.ts               ← Lecture/écriture du JSON
├── public/
│   └── projects/                 ← Images uploadées
├── middleware.ts                 ← Protection route /admin
└── .env.local                    ← Variables d'environnement (ne pas committer)
```

---

## Déploiement sur Vercel

1. Pusher le code sur GitHub
2. Connecter le repo sur [vercel.com](https://vercel.com)
3. Ajouter les variables d'environnement dans Vercel → Settings → Environment Variables
4. Déployer — Vercel s'occupe du reste

> **Important :** Sur Vercel (serverless), les écritures dans `data/projects.json` ne persisteront pas entre les déploiements. Pour un usage en production stable, envisager une base de données (ex : Vercel KV ou Supabase).

---

## Ajouter un projet

Via le panel admin (`/admin`) ou directement dans `data/projects.json` :

```json
{
  "id": "uuid-unique",
  "title": "Nom du projet",
  "slug": "nom-du-projet",
  "category": "site-vitrine",
  "description": "Description courte (carte)",
  "longDescription": "Description longue (modale)",
  "stack": ["Next.js", "Tailwind CSS"],
  "image": "/projects/monimage.jpg",
  "url": "https://monsite.ca",
  "featured": true,
  "visible": true,
  "order": 1,
  "createdAt": "2025-01-15"
}
```

Catégories disponibles : `site-vitrine`, `e-commerce`, `systeme-interne`, `application`
