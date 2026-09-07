# Scane-Tech — Frontend (Angular)

Site vitrine one-page, refonte du site scane-tech.com actuel : design
dynamique et coloré (bleu électrique + orange), contenu branché sur
l'API Django du dossier `backend/`.

## Langue (FR / EN)

Le site propose un sélecteur FR/EN dans le header, avec mémorisation du
choix (localStorage). La logique se trouve dans `src/app/i18n/` :

- `translations.ts` → dictionnaire des textes fixes de l'interface (menu, boutons, libellés...)
- `language.service.ts` → langue active (signal réactif) + persistance
- `translate.pipe.ts` → pipe `{{ 'ma.cle' | t }}` pour les textes fixes de l'interface
- `bilingual.pipe.ts` → pipe `{{ item.champ | bilingual:item.champ_en }}` pour le
  contenu qui vient de la base de données (services, valeurs, directions,
  réalisations)

**Le contenu géré via l'admin Django est maintenant bilingue.** Chaque
modèle a des champs `_en` optionnels (ex: `titre_en`, `description_en`).
Si le client remplit le champ anglais dans l'admin, il s'affiche quand
EN est sélectionné sur le site ; sinon, le contenu français s'affiche
par défaut dans les deux langues. Voir `backend/README.md` pour le détail
de l'interface d'administration.

## Configuration de l'API

L'URL de l'API Django n'est plus codée en dur dans le code : elle vient de
`src/environments/`.

- `environment.ts` → utilisé en développement (`npm start`), pointe vers
  `http://localhost:8000/api`
- `environment.prod.ts` → utilisé en production (`npm run build`), à
  modifier avec l'URL réelle de ton backend une fois déployé (ex:
  `https://api.scane-tech.com/api`)

Pour changer l'URL de l'API, il suffit d'éditer ces deux fichiers — aucun
autre fichier du code n'a besoin d'être touché.

## Installation

```bash
cd frontend
npm install
```

## Lancer en développement

```bash
npm start
```
Le site est accessible sur http://localhost:4200

⚠️ Le backend Django doit tourner en parallèle sur http://localhost:8000
pour que les sections Services / Valeurs / Directions / Réalisations et
le formulaire de contact fonctionnent (sinon des données par défaut
codées en dur s'affichent, sauf pour le formulaire de contact).

## Build de production

```bash
npm run build
```
Fichiers générés dans `dist/scane-tech-frontend/`.

## Images

Les vraies images de Scane-Tech (logo, façade, logos clients) sont déjà
incluses dans `src/assets/images/`. Voir le `LISEZ-MOI.txt` de ce dossier
pour plus de détails.

## Structure

```
src/app/
  app.routes.ts          définit les 6 pages (une URL par onglet)
  route-animations.ts     animation de transition entre les pages
  components/
    header/               barre de contact + navigation par onglets
    footer/                liens utiles
    splash/                animation du logo à l'arrivée sur le site
  directives/
    reveal.directive.ts   apparition progressive des blocs au scroll
  pages/
    home/                  page d'accueil (hero, services, clients)
    about/                 qui sommes-nous + valeurs
    services/              détail des 3 services
    directions/             directions (Opérations, QHSE)
    realisations/           logos clients + projets réalisés
    contact/                formulaire + carte Google Maps + coordonnées
  services/
    api.service.ts         appels HTTP vers l'API Django
```

## Pages et URLs

| Page            | URL               |
|-----------------|-------------------|
| Accueil         | `/`               |
| À propos        | `/a-propos`       |
| Services        | `/services`       |
| Nos directions  | `/nos-directions` |
| Réalisations    | `/realisations`   |
| Contact         | `/contact`        |
