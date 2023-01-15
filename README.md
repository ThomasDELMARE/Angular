# Application de devoirs

## Auteurs 
- DELMARE Thomas
- ELALAOUI Hasnaa
(Tous deux étudiants en Master2 MIAGE à l'Université Côte d'Azur)

## Présentation du projet
Ce projet consiste en une application web de gestion des devoirs à rendre. 
Nous retrouvons sur la page d'accueil la liste de tous les devoirs ainsi que des informations les concernant comme le nom de l'étudiant concerné par le devoir, sa classe, la matière, la note obtenue, le professeur, la date de rendu ainsi que si le devoir a été rendu ou non. 

## Technologies utilisées
L'application a été réalisée en utilisant plusieurs technologies : 
- Angular pour l'interface et l'api
- Mongoose/MongoDB Atlas pour la base de données
- Node/Express pour la base de données
- Vercel pour l'[hébergement de l'application](https://angular-cj29ybv86-thomasdelmare.vercel.app/)
- Render.com pour l'hébergement de l'API
- Github pour l'hébergement du code

## Description du projet
Le projet se décompose en deux parties :
- L'[API](https://github.com/ThomasDELMARE/Angular/tree/main/api)
- Le site [Application de devoirs](https://github.com/ThomasDELMARE/Angular/tree/main/assignments) 

Pour démarrer le projet il faut lancer les deux projets ci-dessus (les étapes pour les démarrer sont présentes dans le fichier README.MD).

Voici une liste des **fonctionnalités** du projet :

- Formulaire de connexion (utilisant JWT) permettant de différencier deux types d'utilisateurs (administrateur ou pas) et permettant également d'empêcher l'accès à certaines pages si l'utilisateur n'est pas connecté

<div align="center">
  <img src="https://media.giphy.com/media/okJ6a0kgudjJKFpnVQ/giphy.gif"/>
</div>
<br>


- Affichage, ajout, modification et suppression des devoirs stockés dans une base de données MongoDB Atlas

    - Affichage grâce à une Material Table

    <br><div align="center">
        <img src="https://media.giphy.com/media/gAabVOAVroj5TgcM7G/giphy.gif"/>
    </div><br>

    - Ajout des devoirs grâce à un Material Stepper

    <br><div align="center">
        <img src="https://media.giphy.com/media/ocOe2gcFFG2FEI9nHO/giphy.gif"/>
    </div><br>

    - Modification des devoirs

    <br><div align="center">
        <img src="https://media.giphy.com/media/he5kRhRdZqSeYl5ru9/giphy.gif"/>
    </div><br>

- Possibilité de filtrer les devoirs
    
    - Par rendu ou non

    <br><div align="center">
        <img src="https://media.giphy.com/media/ykkANdVV5bu4olu0C8/giphy.gif"/>
    </div><br>

    - Par caractéristiques

    <br><div align="center">
        <img src="https://media.giphy.com/media/L6jWjwmZnG8F0HmjIq/giphy.gif"/>
    </div><br>

    - Par la barre de recherche
<br>
<br>
    <div align="center">
        <img src="https://media.giphy.com/media/aaIfJ4Zb3hgptEptrA/giphy.gif"/>
    </div><br>

- Notification des interactions avec la base de données

    <div align="center">
            <img src="https://media.giphy.com/media/gDUeMBPVB9lNWlit3N/giphy.gif"/>
    </div>

<br>

Lien du [site](https://angular-cj29ybv86-thomasdelmare.vercel.app/) hébergé sur Vercel.

Lien de la [vidéo de présentation du projet]().