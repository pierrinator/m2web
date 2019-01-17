Projet M2 Web
=============

Documentation swagger
---------------------
Présente sous 3 formes dans le dossier 'Doc_swagger':
- swagger.json : fichier écris dans Swaggerhub et qui décris l'API
- doc_swagger.html : description de l'API en Html
- doc_swagger_with_urls.html : description de l'API en Html générée automatiquement avec Swaggerhub. Moins bien présentée mais indique les urls des routes

Les autres fichiers de ce dossier ont été générés avec doc_swagger.html.

Référence de la base de données
-------------------------------
Fichier 'ReferenceBDD.md' présente les tables dans la base de données, le type de chaque champ. Pour la table school, on présente également le nom de chaque champ dans l'API du gouvernement (school_name = etablissement_lib)

Requêtes pour déterminer les choix possibles dans les filtres de recherche
--------------------------------------------------------------------------
Fichier 'Request_To_Get_Possible_Fields.md' présente les requêtes à exécuter avec l'API du gouvernement pour obtenir les choix disponibles pour chaque filtre de recherche. Il présente également comment récupérer les données.

Dossier server
--------------
Contient tout le code du serveur. Voici les fichiers/dossiers d'intérêt:
- db.js : contient le code de connexion à la base de données et son initialisation
- login : contient le code de la route /login
- register : contient le code de la route /register
- school : contient le code de la route /school

Le dossier contient également tout les autres fichiers générés pour faire fonctionner Nodejs.

Dossier client
--------------
Contient tout le code du client. Voici les fichiers/dossiers d'intérêt:
- src/app/account : contient le code de la route account qui permet de visualiser la page de déconnexion avec les fichiers html, css et typescript associés
- src/app/dashboard : contient le code du dashboard qui contient le lien vers toutes les autres routes avec les fichiers html, css et typescript associés
- src/app/login : contient le code de la route login qui permet de s'enregistrer ou de se connecter avec les fichiers html, css et typescript associés
- src/app/schools : contient le code de la route schools qui permet d'afficher et supprimer les écoles sauvegardées d'un utilisateur avec les fichiers html, css et typescript associés ainsi que l'interface School qui permet de définir un type
- src/app/search : contient le code de la route search qui permet de rechercher des écoles, les localiser et les sauvegarder avec les fichiers html, css et typescript associés ainsi que l'interface Search qui permet de définir un type
- src/app/jwt.service.ts : contient le code du service qui propose les fonctionnalités d'enregistrement, de connexion et de déconnexion. Il permet aussi de vérifier quel utilisateur est connecté et si quelqu'un est connecté.
- src/app/auth-guard.service.ts : contient le code du service qui propose la fonctionnalité de bloquer une route si l'utilisateur n'est pas connecté.
- src/app/app.module.ts : contient un certain nombre d'imports, la déclaration des modules et de certains services

Le dossier contient également tout les autres fichiers générés pour faire fonctionner Angular.