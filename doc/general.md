**Table des matières**
[Java](P2I%20-%20Projet%20Informatique%20Individuel.md#Java)
[Angular](P2I%20-%20Projet%20Informatique%20Individuel.md#Angular)
[Hébergement](P2I%20-%20Projet%20Informatique%20Individuel.md#Hébergement)


## Back / API
### [Java](doc_java.md)

Les projets springboot ont la logique "convention over configuration", cela signifie qe très peu de choses sont configurables lors de la création d'un projet. 

Ainsi, plein d'éléments sont installés par principe, et on doit supprimer ce qui nous sert pas, ou ce qui n'est pas adapté.

PS : [Quarqus](https://quarkus.io/) est un autre framework pour gérer un back java et est apparemment super, mais springboot est plus ancien et répandu chez les devs

Pour les projets springboot on m'a conseillé maven par rapport à gravle.

[[gestion des créneaux avec spring validation]]


### [Oauth2 & JWT](oauth2_et_jwt.md)

id client : 632681806775-djgu7c0vre0jepsck2rklpogsappf8uq.apps.googleusercontent.com
	
### Fiches d'aide Java/Spring

[[Sécuriser l'endpoint CRSF - Solutions]]


### Postman

Outil utilisé pour communiquer avec les api, peu importe le framework
[Lien vers le cours openclassrooms pour apprendre à l'utiliser](https://openclassrooms.com/fr/courses/6573181-adoptez-les-api-rest-pour-vos-projets-web/7498761-utilisez-postman-pour-formuler-vos-requetes)

## Front

### Angular

abandonné car courbe d'apprentissage trop importante, passage sur React-ts

Structuration du projet : [lien ici](https://ramonprata.medium.com/how-to-structure-a-react-app-in-2025-spa-ssr-or-native-10d8de7a245a)



### TODO FRONT

Basique
- [ ] authentification user / admin
- [ ] équipement (recherche / ajout)
- [ ] exemplaire (ajout / assignation à un emprunt)
- [ ] session
- [ ] réservation (création / validation / annulation)

Optionnel 
- [ ] gestion des emprunts
- [ ] gestion des règles d'équipements
- [ ] gestion des listes d'équipements / favoris


## Hébergement

**Pour le front**
Netlify ou Github si pas de back intégré mais à vérifier


**Pour le back**

Les autres options te permettent d’héberger une image docker (avec ton appli dedans). C’est un poil plus complexe si tu ne maitrise pas docker et les cluster (type kubernetes), mais tu peux trouver des tutos

- [Render](https://hostingtutorials.dev/blog/free-spring-boot-host-with-render)
    
- Google Cloud Platform, AWS : Ce sont des services payant mais qui à priori t’offrent 200/300$ de crédit sur un nouveau compte. J’ai juste peur que tu doives renseigner une CB

(POJA aussi évoqué)

**questions à poser**:
- où héberger la bdd ? voir ent ub
- pour le packaging, jar ou war ? j'ai cru comprendre que war était dédié pour les serveurs d'application donc à checker
- quelles dépendances sont nécessaires pour mon projet springboot ?
	- je pense que cela dépend du stockage de la base de donnée, de la méthode d'hébergement du site, et du reste aussi


## Architecture de l'application


Classsiquement en multi-tiers (front-api-back) mais à voir si ce ne serait pas plus intéressant de le faire en microservices pour la scalabilité. Voici un [lien](https://openclassrooms.com/fr/courses/4668056-construisez-des-microservices/7651431-apprehendez-l-architecture-microservices) qui permet d'en faire un via openclassrooms.

### Architecture Front

Structure basée sur les features : rassemblement des dossiers par fonctionnalité.
Dans chaque fonctionnalité se trouvent les dossiers :
- types -> typage des données récupérées et envoyées
- api -> pour réaliser les appels dédiés à l'api
- hooks -> pour utiliser les résultats des appels
- pages -> pages
- components -> composants


- **Point pour le rendu intermédiaire :** 24/2 9h30 
- **Rendu livrable intermédiaire :** Vendredi 6/3 18h

Etat d'avancement du projet. 3 ou 4 pages à fournir au tuteur. Echéancier mis à jour.

- **Point avant le rendu final et les soutenances :** 31/3 9h30 
- **Rendu livrable projet :** 20/4 12h

Rapport + fichiers sources et exécutables ou produit final

- **Soutenances** les 21,22/4

![[Pasted image 20260115181627.png]]
pour gérer les demandes d'autorisation, et comprendre comment angular communique avec java : https://chatgpt.com/c/6997a5dd-14d8-832b-9011-685358290cec
com

### C'est quoi une spécification ?

1. Objectifs -> user stories
	"ok 'j'ai des objectifs, mon objectif global est que mon utilisateur achète des billets de tram"

2. Parcours utilisateurs
	il faut que mon utilisateur puisse se connecter -objectif-> écran de conneion avec un objectif : se connecter
	page accueil -objectif->accéder aux derniers trajets et ceux disponibles

!!! chaque écran a **un but précis** (permet de ne pas faire 10x la même chose)

3. WireFrame
4. Règles métier
	faire un tableau rassemblant les règles métiers comme fait ci-dessous (pas d'indications visuelles pour préciser l'état des composants)

| Code                       | Description                                                                                                  |
| -------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Recherche_Lignes_Erreur_01 | Si la ligne n'existe pas, alors le composant de recherche passe en erreur                                    |
|                            | La page de recherche est composée de :<br>- un champs libre de recherche<br>- un composant de liste<br>- ... |
|                            |                                                                                                              |

Pour être bien exhaustif  : partir de la page générale en listant tous les composants > traiter composant par composant 

## Choix & questions

**Pourquoi utiliser nullable = false dans ta couche métier alors que tu as déjà une vérif dans le service + dans les dtoRequest ?**
	pour être sûr que même en cas d'erreur métier que j'aurais faite dans mon service je n'ai pas l'erreur 
Pourquoi tout en français et pas anglais ?
Car back construit comme ça, le français plus facile à interpréter et ne casse rien par rapport à la base de code que j'avais fait en front





## TODO 

Back : 
- [ ] mettre les noms de méthode des services en français
- [ ] mettre la portée des méthodes internes aux services en private
- [ ] mettre à jour les équipements en équipements id des relationEquipementDtos
- [ ] ajouter de la gestion de version optimiste
- [ ] avoir un historique qui déclenche lorsque les sessions sont modifiées.
- [ ] avoir un endpoint promote qui permet de promouvoir un user en admin
- [ ] savoir si les entrées des paramètres doivent être nommés data
- [ ] faire un peu de doc pour comprendre les dépendances à nimbusds et la construction du service
- [ ] transformer les dtos du back en records
- [ ] créer un mapper pour le dtoInitialise


## TODO

Front : 
- [ ] gérer l'erreur hors-connexion, ou serveur inaccessible lors du login