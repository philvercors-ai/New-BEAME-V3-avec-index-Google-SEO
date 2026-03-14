# Guide d'utilisation de l'interface d'administration — beame.art

> Ce guide est destiné à l'artiste. Pas besoin de connaissances techniques.
> Toutes les actions se font depuis un navigateur web, comme un site normal.

---

## Sommaire

1. [Accéder à l'administration](#1-accéder-à-ladministration)
2. [Se connecter](#2-se-connecter)
3. [Ajouter une nouvelle oeuvre](#3-ajouter-une-nouvelle-oeuvre)
4. [Modifier une oeuvre existante](#4-modifier-une-oeuvre-existante)
5. [Supprimer une oeuvre](#5-supprimer-une-oeuvre)
6. [Ordre d'affichage dans la galerie](#6-ordre-daffichage-dans-la-galerie)
7. [Modifier le lien Instagram](#7-modifier-le-lien-instagram)
8. [Se déconnecter](#8-se-déconnecter)
9. [Questions fréquentes](#9-questions-fréquentes)

---

## 1. Accéder à l'administration

Ouvrir un navigateur (Chrome, Safari, Firefox) et taper dans la barre d'adresse :

```
https://beame.art/admin
```

Cette page n'est pas visible depuis le menu du site — elle est réservée à l'artiste.

---

## 2. Se connecter

Une fois sur la page `/admin`, un formulaire de connexion apparaît.

- **Email** : votre adresse email (celle fournie lors de la création du compte)
- **Mot de passe** : votre mot de passe personnel

Cliquer sur **SE CONNECTER**.

> Si vous avez oublié votre mot de passe, contacter le développeur du site
> pour qu'il vous envoie un lien de réinitialisation depuis Supabase.

---

## 3. Ajouter une nouvelle oeuvre

### Etape 1 — Ouvrir le formulaire

Cliquer sur le bouton **NOUVELLE OEUVRE** en haut à droite.

Un panneau s'ouvre par-dessus la page.

---

### Etape 2 — Ajouter l'image

Cliquer sur la zone **CHOISIR UNE IMAGE** et sélectionner le fichier photo depuis votre ordinateur.

Formats acceptés : JPG, PNG, WEBP

L'image est immédiatement envoyée et un aperçu s'affiche.

> Conseil : utilisez des photos de bonne qualité (minimum 1000 pixels de large).
> L'image sera automatiquement redimensionnée à l'affichage.

---

### Etape 3 — Remplir les informations

| Champ | Exemple | Obligatoire |
|-------|---------|-------------|
| **Titre** | La forêt bleue | Oui |
| **Slug (URL)** | la-foret-bleue | Auto-généré depuis le titre |
| **Catégorie** | abstrait / paysage / mer & océan / figuratif | Oui |
| **Technique** | Huile | Non |
| **Support** | Toile de lin | Non |
| **Dimensions** | 50x61cm | Non |
| **Prix** | 500€ | Non |
| **Description** | Texte court, poétique, sur l'oeuvre | Non |
| **Cartel** | Texte complémentaire (expo, date...) | Non |
| **Ordre d'affichage** | 1, 2, 3... | Non (0 par défaut) |

> Le **Slug** est l'identifiant dans l'URL (ex: `beame.art/galerie/la-foret-bleue`).
> Il est généré automatiquement depuis le titre. Ne le modifier que si nécessaire.
> Utiliser uniquement des lettres minuscules, chiffres et tirets.

---

### Etape 4 — Enregistrer

Cliquer sur **ENREGISTRER** en bas du formulaire.

L'oeuvre apparaît immédiatement dans la galerie du site.

---

## 4. Modifier une oeuvre existante

Dans la liste des oeuvres, **passer la souris** sur l'image souhaitée.

Deux boutons apparaissent :
- L'icône **crayon** : modifier l'oeuvre
- L'icône **corbeille** : supprimer l'oeuvre

Cliquer sur le **crayon**.

Le formulaire s'ouvre avec les informations actuelles, pré-remplies.

Modifier les champs voulus, puis cliquer sur **ENREGISTRER**.

> Pour changer l'image : cliquer sur **CHANGER L'IMAGE** et sélectionner
> le nouveau fichier. L'ancienne image est remplacée.

---

## 5. Supprimer une oeuvre

Passer la souris sur l'oeuvre dans la liste, puis cliquer sur la **corbeille**.

Une confirmation apparaît :

> "Supprimer définitivement cette oeuvre ?"

Cliquer **OK** pour confirmer. **Cette action est irréversible.**

---

## 6. Ordre d'affichage dans la galerie

Le champ **Ordre d'affichage** contrôle la position dans la galerie.

- `1` = première oeuvre affichée
- `2` = deuxième oeuvre
- etc.

Pour modifier l'ordre : éditer chaque oeuvre et changer sa valeur.

> Astuce : laisser des écarts (10, 20, 30...) pour pouvoir insérer
> facilement de nouvelles oeuvres entre les existantes plus tard.

---

## 7. Modifier le lien Instagram

Il est possible de changer le lien Instagram du site sans faire appel au développeur.

### Etape 1 — Aller dans Paramètres

En haut de la page d'administration, cliquer sur **PARAMÈTRES** (à côté de "Œuvres").

### Etape 2 — Modifier l'URL

Dans le champ **URL Instagram**, remplacer l'adresse actuelle par la nouvelle.

Exemple :
```
https://instagram.com/nouveau_compte
```

### Etape 3 — Enregistrer

Cliquer sur **ENREGISTRER**. Le lien est mis à jour sur le site immédiatement.

> Le lien Instagram apparaît dans le menu de navigation en haut de toutes les pages du site.

---

## 8. Se déconnecter

Cliquer sur **DÉCONNEXION** en haut à droite de la page d'administration.

Vous êtes redirigé vers le formulaire de connexion.

> Il est recommandé de se déconnecter après chaque session,
> surtout si vous utilisez un ordinateur partagé.

---

## 9. Questions fréquentes

**L'oeuvre n'apparaît pas sur le site après l'avoir ajoutée.**
> Attendre quelques secondes et rafraîchir la page du site (touche F5 ou Cmd+R).
> Si le problème persiste, contacter le développeur.

**J'ai oublié mon mot de passe.**
> Contacter le développeur pour recevoir un lien de réinitialisation.

**Quelle taille d'image utiliser ?**
> Entre 1 Mo et 5 Mo est idéal. Trop petite = image floue. Trop grande = lente à charger.
> Format recommandé : JPG ou WEBP.

**Puis-je ajouter plusieurs images par oeuvre ?**
> Non, une seule image par oeuvre pour le moment.

**Le site est-il mis à jour en temps réel ?**
> Oui. Dès que vous enregistrez une oeuvre, elle est visible sur beame.art
> sans délai et sans intervention du développeur.

**La catégorie que je veux n'existe pas dans la liste.**
> Les catégories disponibles sont : abstrait, mer & océan, paysage, figuratif.
> Pour en ajouter une nouvelle, contacter le développeur.

**L'adresse `/admin` ne s'affiche pas.**
> Vérifier que vous êtes bien connecté à internet et que l'URL est exacte :
> `https://beame.art/admin` (avec le `s` dans https).

---

## Récapitulatif — En cas d'urgence

| Problème | Solution |
|----------|----------|
| Mot de passe oublié | Contacter le développeur |
| Oeuvre mal affichée | Modifier l'oeuvre et corriger |
| Image de mauvaise qualité | Modifier l'oeuvre et rechanger l'image |
| Oeuvre ajoutée par erreur | Supprimer l'oeuvre |
| Tout autre problème technique | Contacter le développeur |

---

*Guide rédigé pour beame.art — Mars 2026 — v1.0.0*
