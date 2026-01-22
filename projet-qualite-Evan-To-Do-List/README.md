
# Flask Lists - Test Automation

## Description

Projet de test d'automatisation pour l'application **Flask Lists**, une plateforme web de gestion de listes de tâches.

## Technologies

- **Playwright** : Framework de test e2e
- **Cucumber** : BDD (Behavior-Driven Development)
- **TypeScript** : Langage de programmmation
- **Node.js** : Runtime

## Structure du projet

```
tests/
├── pages/
│   ├── FlaskHomePage.ts
│   ├── FlaskLoginPage.ts
│   └── FlaskListPage.ts
├── features/          # Scénarios Gherkin
│   └── flasklists.feature
├── steps/             # Steps
│   └── flasklists.steps.ts
└── support/           # Hooks et +
```

## Installation

```bash
npm install
npx playwright install
# npm install
```

## Exécution des tests (3 commandes, une pour chaque navigateur)

```bash
$env:BROWSER="chromium"; npm run bdd
$env:BROWSER="firefox";  npm run bdd
$env:BROWSER="webkit";   npm run bdd
```

## Scénarios testés

-  Connexion avec compte existant
-  Création d'une liste et ajout de tâches
-  Suppression de tâches

## Configuration

- **URL de base** : `https://flask.io/`
- **Navigateurs** : Chromium, Firefox, WebKit
- **Reporter** : HTML

## Problème rencontré
- l’extension Cucumber de VSCode affichait “Undefined step” dans les fichiers .feature, ce qui faisait croire que les steps n’étaient pas reconnus cependant je n'avais pas de problème dans le terminal, c'était donc juste un mauvais affichage !
- au début, le navigateur étaient (parfois) créés dans un step Given, ce qui causais des pages non fermées et donc cassaient les scénarios, j'ai donc mis en place hooks Before / After (dans tests/support/hooks.ts) pour que la création/fermeture du navigateur soit bien présente (et bien controllée surtout !)
- j'ai eu un peu de mal à comprendre que certains lien n'apparaissaient sur la page que lorsque on "survole" une zone (par exemple survoler la ligne d'une tâche pour faire apparaitre la croix pour supprimer cette tâche)