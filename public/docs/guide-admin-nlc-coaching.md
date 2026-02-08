# 📋 Guide d'Administration — NLC Coaching

## Table des matières
1. [Connexion à l'espace Admin](#1-connexion)
2. [Navigation dans le panneau](#2-navigation)
3. [Modifier du texte](#3-modifier-texte)
4. [Modifier les informations de contact](#4-contact)
5. [Gérer les images](#5-images)
6. [Gérer les témoignages](#6-temoignages)
7. [Gérer les transformations](#7-transformations)
8. [Bonnes pratiques](#8-bonnes-pratiques)

---

## 1. Connexion à l'espace Admin {#1-connexion}

1. Ouvrez votre navigateur et rendez-vous sur : **votresite.com/admin/login**
2. Entrez votre **adresse email** administrateur
3. Entrez votre **mot de passe**
4. Cliquez sur **« Sign In »**
5. Vous arrivez sur le **Panneau Admin (Dashboard)**

> ⚠️ **Important** : Seuls les comptes avec le rôle « admin » peuvent accéder au panneau. Si vous voyez une erreur ou êtes redirigé vers la page de connexion, contactez le développeur pour vérifier vos droits d'accès.

---

## 2. Navigation dans le panneau {#2-navigation}

### Barre du haut
- **Logo NLC** + titre « Panneau Admin » : vous êtes au bon endroit
- **Voir le site** : ouvre le site public pour vérifier vos modifications
- **Votre email** : affiché pour confirmer votre connexion
- **Déconnexion** : ferme votre session (pensez à vous déconnecter après utilisation)

### Sélecteur de langue (en haut à droite du message de bienvenue)
- **🇬🇧 English** : pour éditer les textes en anglais
- **🇫🇷 Français** : pour éditer les textes en français
- ⚠️ **Vous devez modifier les textes dans CHAQUE langue séparément**

### Les onglets
Chaque onglet correspond à une section du site :

| Onglet | Icône | Ce qu'il permet de modifier |
|--------|-------|-----------------------------|
| **Accueil (Home)** | 🏠 | Titre principal, sous-titre et bouton d'action de la page d'accueil |
| **À Propos (About)** | 👤 | Textes de présentation, badge de section, statistiques |
| **Services** | 💪 | Titres, descriptions et caractéristiques des 3 formules de coaching |
| **Philosophie** | 🧠 | Les 3 piliers : Performance, Discipline, Bienveillance |
| **Bio Coach** | 👤 | Biographie du coach, titre, paragraphes et statistiques |
| **Contact** | ✉️ | Téléphone, email, localisation, WhatsApp, séance découverte |
| **Images** | 🖼️ | Upload et gestion de toutes les images du site |
| **Témoignages** | 💬 | Avis clients avec photo, note et citation |
| **Transformations** | ↔️ | Photos avant/après des clients |

---

## 3. Modifier du texte {#3-modifier-texte}

### Étapes :
1. **Sélectionnez l'onglet** correspondant à la section à modifier (ex : « Accueil »)
2. **Choisissez la langue** : cliquez sur 🇫🇷 Français ou 🇬🇧 English
3. **Modifiez le texte** dans le champ souhaité
4. **Cliquez sur « Save »** (le bouton bleu à droite du champ)
5. ✅ Le message **« Saved successfully! »** confirme la sauvegarde
6. **Changez de langue** et répétez l'opération pour l'autre version

### Exemple concret — Modifier le titre de la page d'accueil :
1. Cliquez sur l'onglet **Accueil**
2. Sélectionnez **🇫🇷 Français**
3. Dans le champ **« Main Title »**, tapez votre nouveau titre en français
4. Cliquez **Save**
5. Passez sur **🇬🇧 English**
6. Tapez la version anglaise du même titre
7. Cliquez **Save**
8. Cliquez **« Voir le site »** pour vérifier le résultat

> 💡 **Astuce** : Si un champ est vide, le site affichera le texte par défaut. Vous pouvez le laisser vide si le texte par défaut vous convient.

---

## 4. Modifier les informations de contact {#4-contact}

1. Allez dans l'onglet **Contact**
2. Vous trouverez plusieurs sections :

### Informations de contact
| Champ | Format | Exemple |
|-------|--------|---------|
| **Téléphone** | Format international | +33 6 16 22 40 37 |
| **Email** | Adresse complète | contact.nlccoaching@gmail.com |
| **Localisation** | Ville, Pays | Lille, France |
| **WhatsApp** | Numéro sans le « + » | 33616224037 |

### Séance découverte
- **Titre** : Le titre de l'encadré de séance découverte
- **Description** : Le texte explicatif
- **Texte du bouton** : Ce qui est écrit sur le bouton de réservation

### Section titre
- **Titre de section** : Le grand titre (ex : « Prêt à transformer votre vie ? »)
- **Sous-titre** : Le texte descriptif sous le titre

3. Cliquez **Save** après chaque modification
4. N'oubliez pas de modifier dans **les deux langues**

---

## 5. Gérer les images {#5-images}

### Ajouter une nouvelle image
1. Allez dans l'onglet **Images**
2. Dans la section « Add New Image » :
   - **Image Name** : donnez un nom unique à l'image (ex : `coach-photo-2024`)
   - **Alt Text** : décrivez l'image en quelques mots (important pour l'accessibilité et le référencement, ex : « Coach NLC en séance de coaching »)
3. Cliquez sur **« Upload Image »**
4. Sélectionnez votre fichier image sur votre ordinateur
5. ✅ Le message **« Image uploaded successfully! »** confirme l'upload

### Supprimer une image
1. Trouvez l'image dans la liste (un aperçu miniature est affiché)
2. Cliquez sur l'icône **🗑️ (poubelle rouge)**
3. Confirmez la suppression

### Recommandations pour les images
- **Formats acceptés** : JPG, PNG, WebP
- **Taille maximale** : 2 Mo recommandé (les images plus lourdes ralentissent le site)
- **Résolution** : 1200×800 pixels minimum pour une bonne qualité
- **Nommage** : utilisez des noms descriptifs sans espaces ni accents (ex : `coach-training`, `salle-sport`)

---

## 6. Gérer les témoignages (avis clients) {#6-temoignages}

### Ajouter un nouvel avis
1. Allez dans l'onglet **Témoignages**
2. Remplissez le formulaire :
   - **Name** (obligatoire) : Prénom du client (ex : « Marie D. »)
   - **Role** (optionnel) : Contexte (ex : « Cliente depuis 2023 », « Perte de poids »)
   - **Message** (obligatoire) : Le texte complet du témoignage
   - **Highlight** (optionnel) : Une phrase clé mise en avant (ex : « -10 kg en 3 mois ! »)
   - **Rating** : Note de 1 à 5 étoiles
   - **Language** : Choisissez FR (français) ou EN (anglais)
3. **Photo du client** (optionnel) : Cliquez sur « Upload Photo » pour ajouter une image
4. Cliquez sur **« Save Testimonial »**

### Modifier un avis existant
1. Trouvez le témoignage dans la liste
2. Cliquez sur l'icône **✏️ (crayon)**
3. Le formulaire se remplit avec les données existantes
4. Modifiez ce que vous souhaitez
5. Cliquez sur **« Save Testimonial »**

### Supprimer un avis
1. Cliquez sur l'icône **🗑️ (poubelle)**
2. Une fenêtre de confirmation apparaît
3. Cliquez sur **« Confirmer »** pour supprimer définitivement

### Activer / Désactiver un avis
- Chaque témoignage peut être **activé** ou **désactivé**
- Un avis désactivé ne s'affiche plus sur le site mais reste dans la base de données
- Utile pour masquer temporairement un avis sans le supprimer

---

## 7. Gérer les transformations (avant/après) {#7-transformations}

### Ajouter une nouvelle transformation
1. Allez dans l'onglet **Transformations**
2. Remplissez le formulaire :
   - **Name** (obligatoire) : Prénom du client (ex : « Magdalena »)
   - **Description** (optionnel) : Résumé du parcours (ex : « -14 kg • 6 mois de coaching »)
3. **Photo AVANT** : Cliquez sur « Upload Before » et sélectionnez la photo
4. **Photo APRÈS** : Cliquez sur « Upload After » et sélectionnez la photo
5. Attendez que les deux photos soient uploadées (un aperçu s'affiche)
6. Cliquez sur **« Save Transformation »**

### Modifier une transformation
1. Cliquez sur l'icône **✏️ (crayon)** à côté de la transformation
2. Modifiez les informations ou changez les photos
3. Cliquez sur **« Save Transformation »**

### Supprimer une transformation
1. Cliquez sur l'icône **🗑️ (poubelle)**
2. Confirmez la suppression

### Activer / Désactiver
- Même principe que les témoignages : permet de masquer sans supprimer

### Conseils pour les photos avant/après
- Utilisez des photos de **même cadrage** (même angle, même distance)
- Préférez un **fond neutre** pour mieux voir la transformation
- Les photos sont affichées côte à côte : le format **portrait (3:4)** est idéal
- Taille recommandée : environ **600×800 pixels** par photo

---

## 8. Bonnes pratiques {#8-bonnes-pratiques}

### ✅ À FAIRE
- ✅ Toujours sauvegarder dans **les deux langues** (FR et EN)
- ✅ Utiliser des images **légères** (< 2 Mo) et optimisées
- ✅ **Vérifier le site** après chaque modification (bouton « Voir le site »)
- ✅ Se **déconnecter** après chaque session d'administration
- ✅ Utiliser des **noms descriptifs** pour les images
- ✅ Remplir les **textes alternatifs** des images (bon pour le référencement Google)

### ❌ À ÉVITER
- ❌ Modifier une seule langue et oublier l'autre
- ❌ Uploader des photos trop lourdes (> 5 Mo)
- ❌ Supprimer des images sans vérifier qu'elles ne sont pas utilisées ailleurs
- ❌ Laisser la session admin ouverte sans surveillance
- ❌ Modifier les textes sans vérifier le résultat sur le site

### 🔄 Processus recommandé pour une mise à jour
1. Se connecter au panneau admin
2. Identifier la section à modifier
3. Faire les modifications en **français**
4. Cliquer **Save**
5. Passer en **anglais** et faire les modifications
6. Cliquer **Save**
7. Ouvrir le site (« Voir le site ») et vérifier le résultat
8. Se déconnecter

---

## 📞 Support

En cas de problème technique ou de question, contactez le développeur du site.

**Problèmes fréquents :**
- « Je ne peux pas me connecter » → Vérifiez vos identifiants ou contactez le développeur pour réinitialiser votre mot de passe
- « Mes modifications n'apparaissent pas » → Rafraîchissez la page du site (Ctrl+F5) pour vider le cache
- « L'upload d'image échoue » → Vérifiez que le fichier fait moins de 2 Mo et est au format JPG, PNG ou WebP
- « Je vois le texte par défaut » → Assurez-vous d'avoir bien cliqué « Save » après votre modification

---

*Document mis à jour le 8 février 2026*
*NLC Coaching — Panneau d'administration*
