Découvrir java via w3c -> https://www.w3schools.com/java/java_getstarted.asp
Bonne documentation -> https://gayerie.dev/docs/java/index.html
Installer un jdk open source -> [eclipse temurin - adoptium](https://adoptium.net/fr)
découvrir les logger -> https://openclassrooms.com/fr/courses/6692416-debuggez-votre-application-java/6915582-faites-des-rapports-avec-un-logger-des-niveaux-de-log-et-l-api-slf4j-standard

[Spring](spring.md)


# Les bases

```java
// écrire du texte dans la console
IO.println("Hello world!");

// recevoir un input
var name = IO.readln("Comment tu t'appelles? ");
```
### Classes & Héritage

```java
class Bicycle {

    int cadence = 0;
    int speed = 0;
    int gear = 1;

    void changeCadence(int newValue) {
         cadence = newValue;
    }

    void changeGear(int newValue) {
         gear = newValue;
    }

    void speedUp(int increment) {
         speed = speed + increment;   
    }

    void applyBrakes(int decrement) {
         speed = speed - decrement;
    }

    void printStates() {
         IO.println("cadence:" +
             cadence + " speed:" + 
             speed + " gear:" + gear);
    }
}
```

```java
class MountainBike extends Bicycle {

    // new fields and methods defining 
    // a mountain bike would go here

}
```

```java
interface Bicycle {

    //  wheel revolutions per minute
    void changeCadence(int newValue);

    void changeGear(int newValue);

    void speedUp(int increment);

    void applyBrakes(int decrement);
}
```

``` java
class MountainBike implements Bicycle {
 // pour implémenter une interface
}
```

## Exceptions

Si un erreur arrive, le programme ne peut pas compiler, alors on ajoute des exceptions pour qu'il puisse tourner et localiser l'endroit où ça casse. Exemple : 

``` java
	public void Manger throws Exception
	{
		// ici si quelque chose casse, cela sera signalé ! 
	} 
```

## Date et Temps

[lien w3c](https://www.w3schools.com/java/java_date.asp)
