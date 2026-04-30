## Oauth2

Oauth 2 est un protocole  qui permet à tout logiciel tiers d'autoriser l'accès à des services (API, App), sans les infos d'authentification (user credentials = id + password). Il contient 4 concepts clés :
- **Propriétaire des ressources** : l'utilisateur ou le système qui possède les ressources protégées et peut en accorder l'accès.
    
- **Client** : le client est le système qui a besoin d'accéder aux ressources protégées. Pour accéder aux ressources, le client doit détenir le jeton d'accès approprié.
    
- **Serveur d'autorisation** : ce serveur reçoit les demandes de jetons d'accès de la part du client et les délivre après authentification et consentement du propriétaire des ressources. Le serveur d'autorisation expose deux points de terminaison : le point de terminaison d'autorisation, qui gère l'authentification et le consentement interactifs de l'utilisateur, et le point de terminaison de jeton, qui fait partie d’une interaction de machine à machine.
    
- **Serveur de ressources** : un serveur qui protège les ressources de l'utilisateur et reçoit les demandes d'accès du client. Il accepte et valide un jeton d'accès du client et lui renvoie les ressources appropriées.
## JWT

https://www.baeldung.com/java-json-web-tokens-jjwt

générer une clé jwt via bash
```bash
openssl rand -base64 32
```

[doc sur la classe JwtClaimsSet](https://docs.spring.io/spring-security/reference/api/java/org/springframework/security/oauth2/jwt/JwtClaimsSet.html)