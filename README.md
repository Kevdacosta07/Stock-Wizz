
Vous pouvez essayer de créer un dossie# Stock Wizz
Ce projet a été réalisé dans le cadre d'un projet scolaire informatique, visant à renforcer les connaissances avec les technologies React & Node JS ainsi que toutes les librairies compatibles.


## Prérequis

- Lien d'installation [NODE](https://nodejs.org/en/download)
- Lien d'installation [GIT](https://git-scm.com/downloads)

### Assurez-vous d'avoir les éléments suivants installés sur votre système
    Node.js (vérifiez avec "node -v")
    npm (vérifiez avec "npm -v")
    Git (vérifiez avec "git --version")


## Étapes d'installation
### Clonez le dépôt
    git clone https://github.com/Kevdacosta07/Stock-Wizz.git

### Accédez au répertoire du projet
Vous pouvez essayer de créer un dossie
    cd Stock-Wizz


### Installation des dépendances côté backend
    cd backend 
    npm install


### Installation des dépendances côté frontend
    cd ..\frontend\
    npm install


## Configuration du serveur
Modifiez le fichier **.env** présent dans le dossier avec vos paramètres spécifiques, tels que la configuration de la base de données (Chemin vers le fichier : **Stock-Wizz/backend/.env**).


## Lancement de l'application
### Revenez au répertoire dans le dossier backend
    cd ..\backend\

### Lancez le serveur Node.js
    npm run server


### Lancez l'application client (dans un autre terminal)
    cd ..\frontend\
    npm run start
L'application devrait maintenant être accessible à l'adresse http://localhost:3000/ dans votre navigateur.


## Compte utilisateurs
**Fonctionne uniquement si la base de donnée présente dans le .env n'a pas été modifié.**
Si vous souhaitez tester l'application dans son intégralité voici deux comptes mis à votre dispositon :

### Compte administrateur
    email:kevin@gmail.com
    password:password

### Compte non administrateur
    email:celia@gmail.com
    password:password

## Dépendances backend
- bcryptjs: 2.4.3
- colors: 1.4.0
- cors: 2.8.5
- dotenv: 16.3.1
- express: 4.18.2
- express-async-handler: 1.2.0
- express-fileupload: 1.4.3
- jsonwebtoken: 9.0.1
- mongoose: 7.4.3
- react: 18.2.0
- react-scripts: 5.0.1


## Dépendances frontend
- reduxjs/toolkit: 1.9.7
- axios: 1.6.0
- react: 18.2.0
- react-dom: 18.2.0
- react-icons: 4.11.0
- react-redux: 8.1.3"
- react-router-dom: 6.17.0
- react-scripts: 5.0.1
- react-toastify: 9.1.3
- web-vitals: 2.1.4


## En cas d'erreur
En cas de problème, veuillez créer un dossier appelé **uploads** dans **frontend/public**