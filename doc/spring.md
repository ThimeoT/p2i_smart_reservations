# Springboot

### Configuration

[spring initializr](https://docs.docker.com/desktop/setup/install/windows-install/)

Dans intelliJ créer un nouveau projet, et prendre le springboot initializer. Lui donner un nom simple, choisir entre le type et le langage utilisé (pour ma part maven et java).

Choisir un nom de groupe évocateur du domaine dans lequel le projet se fait, puis choisir la dernière version LTS de Java.

Pour le packaging, à voir selon votre utilisation mais pour l'instant on utilise Jar

Pareil pour les dépendance il faut voir ce qui vous intéresse mais je prend de base SpringWeb pour pouvoir gérer le contenu web et les appels REST. Il est aussi possible de changer les dépendances du projet après la création de ce dernier.

Pas besoin d'installer maven, car déjà dans le projet springboot.

Pour ajouter des dépendances, aller dans le fichier pom.xml et faire clic droit dans le code > générer > dépendance.

# Spring

Spring est utile pour intégrer de l'injection de dépendance, cad créer des get set plutôt que de s'occuper de la création des objets qui sont attributs d'une classe. La création est gérée par le spring IoC container qui s'en occupe.

Spring possède des composants de configurations nous aidant à gérer facilement des aspects de l'appli, comme des drivers nécessaires pour une base de donnée ou autre.

Spring permet outre l' IoC container de : 
- Interagir avec une base de données.
- Traiter des requêtes HTTP et écrire des réponses HTTP.
- Exécuter des traitements par lots (batch).
- Gérer la sécurité de l’application.
- etc

Spring framework peut être considéré comme un grand magasin spécialisé où l'on peux piocher nos pièces à différents endroits : 
- spring core pour toutes les fonctionnalités de base pour le web [lien vers spring core](https://spring.io/projects/spring-framework)
- spring data pour intéragir avec les bases de données [lien vers spring data](https://spring.io/projects/spring-data)
- spring security un peu complexe mais important pour la sécurité [lien spring security](https://spring.io/projects/spring-security)
- spring cloud dédiées aux applications microservice [lien vers la doc spring cloud](https://spring.io/projects/spring-cloud)
- Spring Boot autoconfigure spring de manière automatique [lien vers springboot](https://spring.io/projects/spring-boot)
- [lien vers les autres outils spring](https://spring.io/projects)

![[Pasted image 20260121184932.png]]

**Les 4 étapes d'un projet**:
- créer le projet
- structurer et configurer le projet
- écrire le code
- tester et déployer

### Annotations

Spring Boot utilise des annotations pour comprendre sur quoi il agit, il y en a de plusieurs types

### Premier code java

Spring Boot fournit une interface nommée “**CommandLineRunner**”. En implémentant cette interface, la classe sera obligée de déclarer la méthode **“public void run(String... args) throws Exception“**. À partir de là, si la classe est un bean (c’est-à-dire chargée dans le contexte Spring), Spring Boot exécutera la méthode run à l’exécution du programme.
on peut alors créer une nouvelle classe qui implémente CommandLineRunner, la méthode run (même corps de méthode), et qui aura une annotation @Component (au-dessus du nom de la classe).

@Autowired permet d'injecter directement le contexte de l'attribut renseigné via sa classe à l'extérieur

En mettant l’annotation @Autowired sur l’attribut bs, **Spring va chercher au sein de son contexte s’il existe un bean de type BusinessService**. 

✅ S’il le trouve, il va alors instancier la classe de ce bean et **injecter cette instance dans l’attribut**. 

❌ S’il ne trouve pas de bean de ce type, Spring génère une erreur.

Résultat : nul besoin de gérer l’instanciation du BusinessService, Spring s’en occupe pour nous. :-)

### Commandes pour lancer l'appli
``` java
mvn spring-boot:run
java jar [nom du jar]
```

## Déployer des projets 

Via Maven : 
```bash
mvn spring-boot:run
```
Via jar
1. A faire à chaque fois avant de lancer un programme, va générer un jar 
``` bash
mvn clean package
```
2. Après que le fichier jar ait été généré, trouver son chemin dans le dossier target
```bash
java -jar target/nom-du-fichier-jar.jar
```
ce qui devrait déployer le projet

## Lier à des BDD

tuto sur spring avec une db de mysql https://spring.io/guides/gs/accessing-data-mysql

## Construire l'architecture d'une API rest

Voici un lien qui montre comment sont construites les api rests (inclus dans le cours d'open classrooms) [cliquer ici](https://openclassrooms.com/fr/courses/6900101-creez-une-application-java-avec-spring-boot/7078015-creez-un-controleur-rest-pour-gerer-vos-donnees#31252353)


## Configurer plusieurs profils pour différentier développement et production

Il est possible de configurer plusieurs profils pour avoir des configurations différentes pour le développement et la production.

Voici un exemple avec deux profils (un pour le dev et un pour la prod)
src/main/resources/ 
├── application.properties (Configuration par défaut) 
├── application-dev.properties (Développement) 
└── application-prod.properties (Production)




# Spring Security

[quelques explications du fonctionnement de spring security en fr](https://www.axopen.com/blog/2023/10/spring-security/)

### Niveau 1 — Les routes dans `SecurityFilterChain`

Tu définis qui peut accéder à quelle route :

java

```java
.requestMatchers(HttpMethod.PUT, "/utilisateurs/{id}").hasAnyRole("ADMIN", "GESTIONNAIRE", "USER")
.requestMatchers(HttpMethod.DELETE, "/utilisateurs/{id}").hasAnyRole("ADMIN")
```

### Niveau 2 — La logique métier dans le service avec `@PreAuthorize`

Tu gères les restrictions fines (ex: un user ne modifie que ses propres champs) :

java

```java
@PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
public ReservationDTO updateReservation(Long id, ReservationUpdateDTO dto) {
    // selon le rôle, tu filtres les champs modifiables
}
```

---

## Pour le cas PUT avec champs restreints selon le rôle

Plutôt que deux routes, tu utilises **un DTO différent selon le rôle** dans le même endpoint :

java

```java
public ReservationDTO update(Long id, ReservationUpdateDTO dto, Authentication auth) {
    Reservation reservation = reservationRepository.findById(id);
    
    // Champs accessibles à tous les rôles autorisés
    reservation.setNom(dto.getNom());
    
    // Champs réservés à admin/gestionnaire
    if (auth.getAuthorities().contains("ROLE_ADMIN")) {
        reservation.setStatut(dto.getStatut());
    }
}
```


# Spring Validation

Spring validation est un framework utile à la vérification des données entrantes au niveau du controlleur. Il est utile pour valider les requêtes entrantes et est donc utilisé dans les différents controlleurs.
# Spring Data

Framework utile pour faire des requêtes facilement sur les tables créées via les entités
[site qui indique comment utiliser springData pour faire des requêtes](https://gayerie.dev/epsi-b3-orm/spring_data/spring_data_jpa.html)

exemple avec des relations @OneToMany @ManyToMany
```java
@OneToMany(  
cascade = CascadeType.ALL, // si je supprime le product, je supprime les comments avec  
        orphanRemoval = true, // permet d'éviter qu'en base de donnée des commentaires existent alors que le produit est supprimé  
        fetch = FetchType.EAGER //on récupère les comments lorsque le produit est fetch  
        )  
@JoinColumn(name="produit_id") //nom de la clé étrangère (celle ci)  
private List<Comment> comments = new ArrayList<>() ;  
  
@OneToMany(  
        mappedBy = "product",  
        cascade = CascadeType.ALL,  
        orphanRemoval = true  
)  
List<Comment> comments = new ArrayList<>();  
  
@ManyToMany(  
        fetch = FetchType.LAZY, // à la récupération du produit, les catégories ne sont pas récupérées  
        cascade = {  
                CascadeType.PERSIST, // cascade présente dans le cas de la création ...  
                CascadeType.MERGE // ... et de la modification ...  
        } // mais pas de la suppression, c'est pour ça qu'on met pas un CascadeType.ALL  
)  
@JoinTable(  
        name = "produit_categorie",  
        joinColumns = @JoinColumn(name = "produit_id"),  
        inverseJoinColumns = @JoinColumn(name = "categorie_id")  
)  
private List<Product> categories = new ArrayList<>();
```

!!! IMPORTANT
- c’est forcément le côté @ManyToOne qui doit être maître de la relation et avoir le @JoinColumn.

 **Helpers methods - pour faciliter la gestion bidirectionnelle**
Pour une relation bidirectionnelle :

- OneToMany/ManyToOne : elles seront du côté OneToMany (là où on gère une liste d’éléments).
    
- ManyToMany : elles seront bien souvent du côté de l’entité qui gère la relation (celle où il y a le @JoinTable). Dans le cas de l’application Carlib Assurances, ce sera donc dans la classe Category comme ci-dessous :
    

``` java
public void addProduct(Product product) {
        products.add(product);
        product.getCategories().add(this);
    }
 
    public void removeProduit(Product product) {
        products.remove(product);
        product.getCategories().remove(this);
    }
```

### Externaliser

Lorsqu'un projet spring boot est mis en prod, il est transformé en JAR et le code y est inaccessible. Pour modifier l'adresse des serveurs des BDD sans accéder au code, on peut :
- utiliser les variables d'environnement
- utiliser un fichier de propriétés externe au JAR

**via les variables d'environnement système**

![[Pasted image 20260222204446.png]]
dans notre fichier application.properties on peut voir toutes ces variables initialisées. Cependant, on peut aussi les définir dans le gestionnaire de variable système en créant une nouvelle variable nommée `spring.datasource.password` ayant pour valeur `root`.

**via un fichier de propriétés externe**

1. on crée un nouveau dossier hors du projet qu'on nommera test
2. dans le dossier test, on ajoute un dossier config
3. on transfère l'actuel fichier application.properties du projet dans le nouveau dossier config réalisé (voici l'apperçu de l'arborescence ci-dessous)
	/mon_projet
	/test
		/config
			application.properties
4. on build le projet via l'invité de commande en rentrant 
	`mvn clean package -DskipTests=true`
5. on récupère le jar créé à l'intérieur du projet dans le dossier target
6. on le copie-colle dans le dossier test (voici l'apperçu de l'arborescence ci-dessous)
	/mon_projet
	/test
		/config
		/mon_projet.jar


### Faire des requêtes

Liste des QueryMethods de DataJPA (permet de définir les requêtes via le nom de méthode)
https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html

Documentation pour le langage JPQL
https://docs.oracle.com/html/E13946_04/ejb3_langref.html

### Utiliser des enums

Méthode la plus simple => utiliser @Enumerated, mais on risque d'avoir des soucis dès qu'on veut modifier l'enum, car les anciennes données seront assignées à des valeurs obsolètes de l'enum

Meilleure méthode => utiliser un converteur qui assigne un code à chaque enum, peu importe l'ordre, les anciennes données rentrées en bdd ne seront pas intraitables

https://www.baeldung.com/jpa-persisting-enums-in-jpa

### Gérer plusieurs requêtes

méhthode utilisée : l'optimist locking -> on utilise un attribut Version que l'on indente à chaque fois qu'il est modifié, puis on vérifie à chaque fois qu'on veut le modifier s'il n'a pas changé au départ.

https://www.baeldung.com/jpa-optimistic-locking

### Utiliser MapStruct pour faciliter la création des DTOs

https://medium.com/@aholoujoel5/utilisation-de-mapstruct-simplifiez-le-mappage-dobjets-java-882006146be5


### Gestion des Exceptions

# Problèmes rencontrés

- Dans intelliJ si l'erreur "could not resolve" arrive sur les imports du projet : clic droit sur le dossier racine du projet et Maven>Generate Sources....
	- ou sinon **File > Invalidate Caches**

# Ressources

**Liste des méthodes CrudRepository**
![[Pasted image 20260224164726.png]]
## Gérer les multiUsers via l'optimist locking

Pour pouvoir gérer l'accès à plusieurs utilisateurs sur une entité, il faut que cette dernière possède une propriété annotée `@Version`. Avant chaque transaction voulant faire une update, la propriété version est checkée, et si sa valeur a changé, une `OptimistickLockException` est levée. Sinon la transaction est bien réalisée et la valeur est incrémentée proprement.

**Optimist vs. pessimist locking**

L'optimist locking est basée sur la vérification d'une propriété en vérifiant leur attribut de version. La version pessimiste lock la data et personne ne peut être réalisée dessus (ni read / update / delete ). Cela permet une bonne préservation de la data, mais n'est pas adaptée lorsque des appels de 

### MapStruct et la simplification du mappage des données en DTO
https://medium.com/@aholoujoel5/utilisation-de-mapstruct-simplifiez-le-mappage-dobjets-java-882006146be5
