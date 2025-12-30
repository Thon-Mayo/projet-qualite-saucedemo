Site testé : https://www.saucedemo.com/
Utilisé : Playwright + Cucumber + TypeScript + POM


Installation :
npm install
npx playwright install


Lancer les tests :
npm run bdd


Scénarios :
Achat complet
Login invalide (erreur)
Compte verrouillé
Ajout + suppression d’un article du panier


Structure :
tests/pages = Page Objects
tests/steps = steps Cucumber
tests/features = scénarios Gherkin


Dificultées rencontrées :
- l’extension Cucumber de VSCode affichait “Undefined step” dans les fichiers .feature, ce qui faisait croire que les steps n’étaient pas reconnus
cependant je n'avais pas de problème dans le terminal, c'était donc juste un mauvais affichage !
- au début, le navigateur étaient (parfois) créés dans un step Given, ce qui causais des pages non fermées et donc cassaient les scénarios, j'ai donc mis en place  hooks Before / After (dans tests/support/hooks.ts) pour que la création/fermeture du navigateur soit bien présente.
