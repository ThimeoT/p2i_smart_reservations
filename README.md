# Smart Réservations

Plateforme web de gestion et de réservation de matériel.  
Projet réalisé dans le cadre du projet informatique individuel (2A ENSC).

## Architecture

Ce dépôt est un monorepo contenant deux applications indépendantes :

```
p2i_smart_reservations/
├── api/                      # Backend — Spring Boot REST API
└── smart-reservation-app/    # Frontend — React / TypeScript
```

Le backend est une API REST Java / Spring Boot — [voir le README détaillé](api/README.md).  
Le frontend est une application React TypeScript — [voir le README détaillé](smart-reservation-app/README.md).

Les deux applications sont déployées séparément.

---

## Prérequis

| Outil | Version minimale | Rôle |
|-------|-----------------|------|
| Java (Oracle JDK) | 25 | Exécution du backend |
| Maven | 3.6+ | Build Java (inclus via le wrapper `mvnw`) |
| Node.js | 18+ | Exécution du frontend |
| npm | 9+ | Gestion des paquets JavaScript |

---

## Installation des outils

### Java 25 (Oracle JDK)

#### Windows

1. Aller sur [oracle.com/java/technologies/downloads](https://www.oracle.com/java/technologies/downloads/) et sélectionner **Java 25 → Windows → Installer (`.exe`)**
2. Exécuter l'installeur et suivre les étapes (options par défaut recommandées)
3. Ouvrir un nouveau terminal et vérifier :

```powershell
java -version
# java version "25" ...
```

> Si la commande n'est pas reconnue, ajouter manuellement `C:\Program Files\Java\jdk-25\bin` à la variable d'environnement `PATH` :  
> `Paramètres système → Variables d'environnement avancées → PATH → Nouveau`

#### macOS

1. Aller sur [oracle.com/java/technologies/downloads](https://www.oracle.com/java/technologies/downloads/) et sélectionner **Java 25 → macOS → DMG Installer**
2. Ouvrir le `.dmg` et suivre les étapes
3. Vérifier :

```bash
java -version
```

#### Linux (Debian/Ubuntu)

1. Aller sur [oracle.com/java/technologies/downloads](https://www.oracle.com/java/technologies/downloads/) et télécharger le package **`.deb`** pour Java 25
2. Installer :

```bash
sudo dpkg -i jdk-25_linux-x64_bin.deb
java -version
```

---

### Maven

Le projet embarque un **wrapper Maven** (`mvnw` / `mvnw.cmd`) — **aucune installation globale n'est nécessaire**. Il télécharge automatiquement la bonne version au premier lancement.

Pour une installation globale optionnelle :

1. Télécharger l'archive `.zip` sur [maven.apache.org/download.cgi](https://maven.apache.org/download.cgi)
2. Extraire dans le dossier de votre choix (ex. `C:\Program Files\Apache\maven`)
3. Ajouter `<dossier_maven>\bin` à la variable `PATH`
4. Vérifier :

```bash
mvn -version
# Apache Maven 3.x.x
```

---

### Node.js & npm

#### Windows

1. Aller sur [nodejs.org](https://nodejs.org/) et télécharger la version **LTS** (format `.msi`)
2. Exécuter l'installeur  
   > Laisser coché « Add to PATH » pour que `node` et `npm` soient accessibles depuis le terminal
3. Redémarrer le terminal et vérifier :

```powershell
node -v   # v18.x.x ou supérieur
npm -v    # 9.x.x ou supérieur
```

#### macOS

```bash
brew install node
node -v && npm -v
```

#### Linux (Debian/Ubuntu)

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node -v && npm -v
```

---

## Lancer le projet en local

### 1. Démarrer le backend

```bash
cd api

# macOS / Linux
./mvnw spring-boot:run

# Windows (PowerShell)
.\mvnw.cmd spring-boot:run
// ou mvn spring-boot:run
```

L'API démarre sur `http://localhost:8080`.  
En profil `dev`, une base H2 en mémoire est utilisée — console sur `http://localhost:8080/h2`.

Deux comptes de test sont créés automatiquement au démarrage :

| Rôle | Email | Mot de passe |
|------|-------|-------------|
| Utilisateur | `user@test.com` | `user` |
| Administrateur | `admin@test.com` | `admin` |

### 2. Démarrer le frontend

Créer un fichier `.env.local` dans `smart-reservation-app/` :

```env
VITE_API_URL=http://localhost:8080
```

Puis :

```bash
cd smart-reservation-app
npm install
npm run dev
```

L'application démarre sur `http://localhost:5173`.

---

## Documentation détaillée

- [Backend — api/README.md](api/README.md)
- [Frontend — smart-reservation-app/README.md](smart-reservation-app/README.md)

## Contact

Pour toute question : ttonon@ensc.fr
