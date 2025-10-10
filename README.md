# TP Responsive Design - Mon CV en ligne

## À propos
Ce TP est un projet développé en HTML/CSS dans le cadre du UE : Développement Clients Web.

## Section 1 - Structure HTML 

**Tag Git créé** : `Structure`

## Section 2 - Un peu de style

### Fichier resume.css
J'ai créé le fichier `css/resume.css` qui contient tous les styles de base du CV :
- **Fond de page** : couleur sombre (#777)
- **Conteneur principal** (#wrapper) : largeur maximale de 900px, minimale de 320px, centré avec des marges automatiques
- **Header** : image arrondie alignée à droite avec une bordure de 1px (#ccc) et un effet d'ombre (box-shadow: 2px 4px rgba(0,0,0,0.2))
- **Typographie** : utilisation de la police Source Sans Pro via Adobe Edge Web Fonts
- **Font Awesome** : pour les icônes (user, graduation-cap, map-marker, etc.)

Le fichier est chargé dans le HTML via `<link rel="stylesheet" href="css/resume.css" />`.

**Tag Git créé** : `CSS`

## Section 3 - Mise en ligne

Le CV est déployé sur **GitHub Pages** (équivalent de GitLab Pages) et est accessible à l'adresse :
**https://hibachioua.github.io/TP_responsive_design/**

## Section 4 - Adaptatif ou responsive

### Fichier responsive.css
J'ai créé le fichier `css/responsive.css` qui contient les media queries pour adapter l'affichage :

**Ce qui se passe lors de l'affichage** :
- Le navigateur lit les media queries et applique les styles en fonction de la largeur de l'écran
- Les changements sont automatiques et en temps réel quand on redimensionne la fenêtre

**Modifications apportées** :
- Annulation du changement de couleur de fond (remplacé par des couleurs très visibles pour le test : bleu, vert, rouge)
- **Affichage sur une seule colonne** pour les petits écrans (≤ 480px) : la photo passe au-dessus du texte, plus de flottement
- **Titres centrés** (h1, h2) sur les petits écrans grâce à `text-align: center`
- Adaptation progressive des marges et paddings

**Tag Git créé** : `responsive`

## Section 5 - Micro-données

J'ai intégré le vocabulaire **Schema.org** pour structurer les informations personnelles :
- Utilisation de `itemscope` et `itemtype="http://schema.org/Person"` pour identifier une personne
- Propriétés ajoutées avec `itemprop` : name, jobTitle, address, telephone, email

**Pourquoi c'est utile ?** 
Les moteurs de recherche peuvent mieux comprendre et indexer le contenu du CV, ce qui améliore le référencement.

**Tag Git créé** : `microdata`

## Technologies utilisées
- HTML5 avec micro-données Schema.org
- CSS3 (media queries pour le responsive)
- Font Awesome pour les icônes
- Adobe Edge Web Fonts (Source Sans Pro)
- Git / GitHub pour la gestion de versions et l'hébergement

