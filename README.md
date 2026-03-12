# p2i_smart_reservations
Plateforme de gestion logistique de matériel sportif et de réservation. Projet réalisé dans le cadre du projet informatique individuel (2A ENSC).

## Table des matières

- API
  - 

## API

Ce dossier contient l'API REST du projet **SMART Reservation** développée avec Spring Boot.

### Prérequis

- Java 25 (ou version compatible avec `java.version` dans le `pom.xml`)
- Maven 3.6+ (ou wrapper `mvnw` fourni)
- Git
- Base de données PostgreSQL (ou H2 en mémoire pour le développement)

> 💡 Pour les tests ou le développement local, l'application utilise H2. En production, configurez PostgreSQL en renommant/complétant `application-dev.properties` et `application-prod.properties`.

### Récupérer le projet

```bash
# cloner le dépôt
git clone <URL_DU_REPO>
cd p2i_smart_reservations/api
```

### Construction

```bash
# compiler et exécuter les tests
./mvnw clean install

# lancer l'application
./mvnw spring-boot:run
```

Vous pouvez aussi construire un jar exécutable et le lancer :

```bash
./mvnw package
java -jar target/api-0.0.1-SNAPSHOT.jar
```

### Configuration

Les fichiers `src/main/resources/application-*.properties` contiennent les configurations de profils (`dev`, `prod`, etc.).

- `spring.datasource.url` pour la base de données
- `spring.datasource.username` / `password`

L'accès à la console H2 est activé lorsque le profile `dev` est actif : `http://localhost:8080/h2-console`.

### Points importants

- Le projet est basé sur Spring Boot 4.0.2.
- MapStruct est utilisé pour les mappers (version 1.6.3).
- Lombok est utilisé pour générer les getters/setters (annotation processor activé dans le pom).

### Lancer les tests

```bash
./mvnw test
```

### Structure du projet

- `controller` : points d'API
- `service` : logique métier
- `repository` : interfaces JPA
- `mapper` : conversion entité/dto
- `model` : entités JPA

### Développement

1. Créez une branche pour effectuer des modifications sur le projet :
   ```bash
   git checkout -b feature/ma-fonctionnalite
   ```
## Aide

Pour toute question, consulter la documentation Spring Boot, sinon via mon mail : ttonon@ensc.fr

---

## Front

Ce dossier contient le projet Angular concernant l'application en front end