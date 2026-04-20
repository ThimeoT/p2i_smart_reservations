# Smart Réservations — Backend

API REST développée avec Spring Boot pour la gestion des équipements, exemplaires, réservations et utilisateurs.

## Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| Java | 25 | Langage |
| Spring Boot | 4.0.2 | Framework principal |
| Spring Security + JWT | — | Authentification |
| Spring Data JPA / Hibernate | — | ORM |
| MapStruct | 1.6.3 | Mapping entité ↔ DTO |
| Lombok | — | Réduction boilerplate |
| H2 | — | Base de données en mémoire (dev) |
| PostgreSQL | — | Base de données (prod) |

---

## Prérequis

### Java 25

Le projet nécessite **Java 25 (Oracle JDK)**. Vérifier votre version installée :

```bash
java -version
# Résultat attendu : java version "25" ...
```

Si Java 25 n'est pas installé :

#### Windows

1. Aller sur [oracle.com/java/technologies/downloads](https://www.oracle.com/java/technologies/downloads/) et sélectionner **Java 25 → Windows → Installer (`.exe`)**
2. Exécuter l'installeur et suivre les étapes (laisser les options par défaut)
3. Ouvrir un nouveau terminal et vérifier :

```powershell
java -version
```

> Si la commande n'est pas reconnue, ajouter manuellement le dossier `bin` du JDK à la variable `PATH` :  
> `Paramètres système → Variables d'environnement → PATH → Ajouter C:\Program Files\Java\jdk-25\bin`

#### macOS

1. Aller sur [oracle.com/java/technologies/downloads](https://www.oracle.com/java/technologies/downloads/) et sélectionner **Java 25 → macOS → DMG Installer**
2. Ouvrir le `.dmg` et suivre les étapes d'installation
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

Le projet embarque un **wrapper Maven** (`mvnw` / `mvnw.cmd`) — **aucune installation globale n'est nécessaire**. Le wrapper télécharge automatiquement la bonne version de Maven au premier lancement.

Pour une installation globale optionnelle :

1. Télécharger l'archive binaire sur [maven.apache.org/download.cgi](https://maven.apache.org/download.cgi) (fichier `apache-maven-x.x.x-bin.zip`)
2. Extraire dans le dossier de votre choix (ex. `C:\Program Files\Apache\maven`)
3. Ajouter `<dossier_maven>\bin` à la variable d'environnement `PATH`
4. Vérifier :

```bash
mvn -version
# Apache Maven 3.x.x
```

---

## Lancer en local

```bash
cd api

# macOS / Linux
./mvnw spring-boot:run

# Windows (PowerShell)
.\mvnw.cmd spring-boot:run
```

Le profil `dev` est actif par défaut. L'API écoute sur `http://localhost:8080`.

Console H2 : `http://localhost:8080/h2`  
Identifiants H2 : `sa` / `password`

### Comptes de test (profil `dev`)

En profil `dev`, la base est alimentée automatiquement au démarrage par `FournisseurDonnees.java`. Deux comptes sont disponibles :

| Rôle | Email | Mot de passe |
|------|-------|-------------|
| Utilisateur | `user@test.com` | `user` |
| Administrateur | `admin@test.com` | `admin` |

### Construire un JAR

```bash
./mvnw clean package
java -jar target/api-0.0.1-SNAPSHOT.jar
```

---

## Configuration

### Variables d'environnement

| Variable | Défaut | Description |
|---|---|---|
| `JWT_SECRET` | valeur par défaut dev | Clé de signature JWT |
| `JWT_EXPIRATION` | `3600000` (1h) | Durée de validité du token en ms |

### Profils

**`dev`** (`application-dev.properties`) — base H2 en mémoire, `ddl-auto=create-drop`, logs sécurité activés.

**`prod`** — configurer `spring.datasource.url`, `username`, `password` pour PostgreSQL et `ddl-auto=validate` (avec Flyway recommandé pour les migrations).

---

## Structure du projet

```
src/main/java/com/smart_reservation/api/
├── controller/       # Endpoints REST
├── service/          # Logique métier
├── repository/       # Interfaces Spring Data JPA
├── model/            # Entités JPA
├── dto/
│   ├── request/      # DTOs entrants
│   ├── response/     # DTOs sortants (complets)
│   ├── resume/       # DTOs sortants (résumés)
│   └── mapper/       # Interfaces MapStruct
├── exception/        # Exceptions métier
├── security/         # Configuration JWT et Spring Security
└── config/           # Beans de configuration
```

---

## Modèle de données

```
Utilisateur
    └── Reservation (1-N)
            ├── HistoriqueReservation (1-N)
            └── Session (1-N)
                    └── Emprunt (1-N)
                            └── Exemplaire (N-1)
                                    └── Equipement (N-1)
                                            └── Label (N-N)
```

| Entité | Description |
|---|---|
| `Utilisateur` | Compte utilisateur avec rôle (USER / ADMIN) |
| `Equipement` | Matériel disponible à la réservation |
| `Exemplaire` | Instance physique d'un équipement |
| `Label` | Tag associé à un équipement |
| `Reservation` | Demande de réservation d'un utilisateur |
| `Session` | Créneau horaire au sein d'une réservation |
| `Emprunt` | Association exemplaire ↔ session |
| `HistoriqueReservation` | Trace des actions sur une réservation |

---

## Endpoints REST

### Authentification — `/auth`
| Méthode | Route | Description |
|---|---|---|
| POST | `/auth/login` | Connexion, retourne un JWT |
| POST | `/auth/register` | Inscription |

### Équipements — `/equipements`
| Méthode | Route | Description |
|---|---|---|
| GET | `/equipements` | Liste tous les équipements |
| GET | `/equipements/{id}` | Détail d'un équipement |
| POST | `/equipements` | Créer un équipement |
| PUT | `/equipements/{id}` | Modifier un équipement |
| DELETE | `/equipements/{id}` | Supprimer un équipement |
| PATCH | `/equipements/{id}/labels/{labelId}` | Ajouter un label |
| DELETE | `/equipements/{id}/labels/{labelId}` | Retirer un label |

### Exemplaires — `/exemplaires`
| Méthode | Route | Description |
|---|---|---|
| GET | `/exemplaires` | Liste tous les exemplaires |
| GET | `/exemplaires/{id}` | Détail d'un exemplaire |
| GET | `/exemplaires/{id}/emprunts` | Emprunts sur une période (body: `PeriodeRequestDto`) |
| POST | `/exemplaires` | Créer un exemplaire |
| PUT | `/exemplaires/{id}` | Modifier un exemplaire |
| DELETE | `/exemplaires/{id}` | Supprimer un exemplaire |

### Réservations — `/reservations`
| Méthode | Route | Description |
|---|---|---|
| GET | `/reservations` | Liste toutes les réservations (résumé + sessions) |
| GET | `/reservations/mes-reservations` | Réservations de l'utilisateur connecté |
| GET | `/reservations/{id}` | Détail complet d'une réservation |
| POST | `/reservations` | Créer une réservation |
| PUT | `/reservations/{id}` | Modifier une réservation |
| PATCH | `/reservations/{id}/valider` | Valider une réservation |
| PATCH | `/reservations/{id}/refuser` | Refuser une réservation |
| DELETE | `/reservations/{id}` | Supprimer une réservation |

### Emprunts — `/emprunts`
| Méthode | Route | Description |
|---|---|---|
| GET | `/emprunts/{id}` | Détail d'un emprunt |
| GET | `/emprunts/equipement/{id}?debut=&fin=` | Emprunts d'un équipement sur une période |
| PATCH | `/emprunts/{id}/terminer` | Marquer comme terminé |
| PATCH | `/emprunts/{id}/annuler` | Annuler un emprunt |
| DELETE | `/emprunts/{id}` | Supprimer un emprunt |

### Labels — `/labels`
| Méthode | Route | Description |
|---|---|---|
| GET | `/labels` | Liste tous les labels |
| GET | `/labels/{id}` | Détail d'un label |
| POST | `/labels` | Créer un label |
| PUT | `/labels/{id}` | Modifier un label |
| DELETE | `/labels/{id}` | Supprimer un label |

### Utilisateurs — `/utilisateurs`
| Méthode | Route | Description |
|---|---|---|
| GET | `/utilisateurs` | Liste tous les utilisateurs |
| GET | `/utilisateurs/{id}` | Détail d'un utilisateur |
| PUT | `/utilisateurs/{id}` | Modifier un utilisateur |
| DELETE | `/utilisateurs/{id}` | Supprimer un utilisateur |

---

## Sécurité

Toutes les routes (sauf `/auth/**`) nécessitent un token JWT dans le header :

```
Authorization: Bearer <token>
```

Certaines routes sont restreintes au rôle `ADMIN`.
