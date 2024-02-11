# Instructions d'installation pour "Stock Wizz"

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
    cd Stock-Wizz


### Installation des dépendances côté backend
    cd backend 
    npm install


### Installation des dépendances côté frontend
    cd ..\frontend\
    npm install


## Configuration du serveur
Modifiez le fichier .env présent dans le dossier avec vos paramètres spécifiques, tels que la configuration de la base de données (Stock-Wizz/backend/.env).


## Lancement de l'application
### Revenez au répertoire dans le dossier backend
    cd ..\backend\

### Lancez le serveur Node.js
    npm run server


### Lancez l'application client (dans un autre terminal)
    cd ..\frontend\
    npm run start
L'application devrait maintenant être accessible à l'adresse http://localhost:3000/ dans votre navigateur.