# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```
2. .env
   cree un .env à la racine du projet et renseigné c'est deux champ ( la sécurité n'est pas bonne mais je n'ai pas d'Api backend pour stocker les clés ) 
   EXPO_PUBLIC_SUPABASE_URL="https://thtiqavkmsgftlztikre.supabase.co"
EXPO_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRodGlxYXZrbXNnZnRsenRpa3JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMDc5MDMsImV4cCI6MjA2MDU4MzkwM30.nLQCC5JGyUI6Yb2v1HNwaqqPCULJx9iXE-vRHkHdbA4"

   
4. Start the app

   ```bash
    npx expo start

5. Voici un apercu de notre base de données 
   
   ```<img width="1440" alt="Capture d’écran 2025-04-20 à 21 35 27" src="https://github.com/user-attachments/assets/1c019e43-f9c1-49dd-bb2c-329472232e47" />


In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

# 📱 Eventme

**Eventme** est une application mobile développée avec **Expo Router** et **Supabase**, qui permet d'explorer, filtrer et participer à des événements en Île-de-France.

---

## 🧭 Navigation

L'application est organisée autour de cinq onglets principaux :

- 🏠 **Home**
- 🗺️ **Maps**
- 🔍 **Recherche**
- 📅 **Mes événements**
- 👤 **Profil**

---

## 🧩 Fonctionnalités par page

### 🏠 Home

> Affichage des événements par date, avec filtres

- Regroupe les événements par date : **Aujourd’hui**, **Demain**, ou date explicite.
- Filtres disponibles :
  - Ville
  - Date (avec calendrier)
  - Catégorie (ex : musique, sport...)
  - Événements **gratuits** ou **premium**
- Bouton "Voir tous les événements"
- Navigation vers la page de détails d’un événement

---

### 🗺️ Maps

> Géolocalisation et exploration visuelle

- Accès à la **position actuelle** de l’utilisateur
- Affichage des événements **à proximité** sur une carte (OpenStreetMap)
- Chaque événement est cliquable pour accéder à sa page de détails

---

### 🔍 Recherche

> Recherche textuelle dans les événements

- Champ de recherche par **titre d'événement**
- Résultats mis à jour en temps réel
- Navigation vers la page de l’événement

---

### 📅 My Events

> Suivi des événements auxquels on participe

- Affiche les événements que l’utilisateur a **rejoints**
- Affichage sous forme de liste avec date et lieu
- Tri chronologique automatique

---

### 👤 Profil

> Informations utilisateur + progression

- Affiche :
  - **Email**
  - **Nom**
  - Nombre d'événements rejoints
  - **Score** en "diamants" 🟣 :
    - +5 par participation
    - +15 par partage
    - +20 par ajout d’ami
- Affiche un badge ou une info spéciale quand le score atteint **100 diamants** : accès aux **événements premium**

---

### 📄 Page d’un événement (`/event/[id]`)

> Détail complet d’un événement

- Titre de l’événement
- Lieu (nom et ville)
- Date et heure
- Description
- Boutons :
  - **Partager** (simule un partage et augmente les points)
  - **Je participe** (ajoute à "Mes événements" et augmente les points)
- Si l'événement est premium et que l’utilisateur n’a pas assez de points :
  - Un message est affiché et la participation est bloquée

---

## 🚀 Stack technique

- **React Native + Expo Router**
- **Supabase** (authentification + base de données)
- **OpenStreetMap** (cartographie sans clé API)
- **TypeScript**

---

## 📌 Les plus

- Notifications push
- Rappels

