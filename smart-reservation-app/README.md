# Smart Réservations — Frontend

Interface web développée avec React et TypeScript pour la gestion et la réservation de matériel.

## Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| React | 19 | Framework UI |
| TypeScript | — | Typage statique |
| Vite | — | Build tool et serveur de développement |
| React Router | 7 | Routing côté client |
| TanStack Query | 5 | Fetch, cache et synchronisation des données |
| React Hook Form | 7 | Gestion des formulaires |
| Tailwind CSS | 4 | Styles utilitaires |
| react-day-picker | 9 | Composant calendrier |
| date-fns | 4 | Manipulation des dates |
| Heroicons | 2 | Icônes |

---

## Prérequis

### Node.js 18+ et npm

Vérifier votre version installée :

```bash
node -v   # v18.x.x ou supérieur
npm -v    # 9.x.x ou supérieur
```

Si Node.js n'est pas installé :

#### Windows

1. Aller sur [nodejs.org](https://nodejs.org/) et télécharger la version **LTS** (format `.msi`)
2. Exécuter l'installeur `.msi` et suivre les étapes  
   > Laisser coché « Add to PATH » pour que `node` et `npm` soient accessibles depuis le terminal
3. Redémarrer le terminal et vérifier :

```powershell
node -v
npm -v
```

#### macOS

```bash
brew install node
node -v
npm -v
```

#### Linux (Debian/Ubuntu)

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v
```

---

## Lancer en local

### 1. Configurer les variables d'environnement

Créer un fichier `.env.local` à la racine du dossier `smart-reservation-app/` :

```env
VITE_API_URL=http://localhost:8080
```

> Ce fichier pointe vers l'URL du backend. S'assurer que le backend est bien démarré avant de lancer le frontend.

### 2. Installer les dépendances

```bash
cd smart-reservation-app
npm install
```

### 3. Démarrer le serveur de développement

```bash
npm run dev
```

L'application démarre sur `http://localhost:5173`.

### Autres commandes

```bash
npm run build       # Compilation pour la production (dossier dist/)
npm run preview     # Prévisualiser le build de production en local
npm run lint        # Vérification ESLint
```

---

## Structure du projet

```
src/
├── app/
│   ├── context/        # Contextes applicatifs (historique de navigation)
│   ├── router/         # Définition des routes et guards
│   ├── styles/         # CSS global
│   └── views/          # Layout racine, Header, Footer
├── assets/             # Images et icônes statiques
├── config/             # fetchClient, tokenManager, variables d'environnement
├── features/           # Modules métier (un dossier par domaine)
│   ├── auth/           # Authentification et initialisation de compte
│   ├── equipments/     # Catalogue et détail des équipements
│   ├── instances/      # Exemplaires (instances physiques)
│   ├── reservations/   # Réservations (création, détail, admin)
│   ├── disponibilites/ # Calendrier de disponibilités
│   ├── label/          # Labels des équipements
│   ├── users/          # Profils utilisateurs
│   ├── controlCenter/  # Centre de contrôle administrateur
│   └── home/           # Page d'accueil
└── shared/
    ├── components/     # Composants réutilisables (boutons, formulaires, cartes…)
    └── hooks/          # Hooks génériques
```

Chaque module `features/` suit la même organisation interne :

- `api/` — appels vers le backend
- `hooks/` — encapsulation des appels API avec TanStack Query
- `components/` — composants UI propres à la feature
- `pages/` — pages complètes
- `types/` — types TypeScript

---

## Routes

### Utilisateur connecté

| Route | Page |
|---|---|
| `/home` | Accueil |
| `/equipements` | Catalogue des équipements |
| `/equipements/:id` | Détail d'un équipement |
| `/labels/:id` | Détail d'un label |
| `/exemplaires/:id` | Détail d'un exemplaire |
| `/disponibilites` | Calendrier de disponibilités |
| `/reservations/mes-reservations` | Mes réservations |
| `/reservations/creer` | Créer une réservation |
| `/reservations/:id` | Détail d'une réservation |
| `/profile` | Mon profil |
| `/profile/edit` | Modifier mon profil |
| `/aide` | Page d'aide |

### Administrateur

| Route | Page |
|---|---|
| `/admin/users` | Liste des utilisateurs |
| `/admin/users/:id` | Profil d'un utilisateur |
| `/admin/users/:id/edit` | Modifier un utilisateur |
| `/admin/equipements` | Gestion des équipements |
| `/equipements/ajouter-equipement` | Ajouter un équipement |
| `/admin/equipements/:id/modifier` | Modifier un équipement |
| `/admin/labels` | Gestion des labels |
| `/admin/exemplaires` | Gestion des exemplaires |
| `/admin/reservations` | Gestion des réservations |

---

## Architecture technique

### Authentification

Le token JWT est géré par `tokenManager` ([config/tokenManager.ts](src/config/tokenManager.ts)). Le `fetchClient` ([config/fetchClient.ts](src/config/fetchClient.ts)) l'injecte automatiquement dans chaque requête via le header `Authorization: Bearer <token>`. En cas de réponse 401, un callback `registerOnUnauthorized()` déclenche la déconnexion.

### Données

TanStack Query gère le fetch, la mise en cache et la revalidation. Chaque feature expose ses propres hooks (`useEquipements`, `useReservation`, etc.) qui encapsulent les appels API et l'état de chargement.

### Guards de navigation

| Guard | Rôle |
|---|---|
| `ProtectedRoute` | Redirige vers `/login` si non authentifié |
| `AdminRoute` | Redirige vers `/404` si le rôle n'est pas `ADMIN` |
| `InviteRoute` | Réservé à l'initialisation de compte (statut `INVITE`) |
| `FallbackRedirect` | Redirige vers `/home` ou `/login` selon l'état d'authentification |
