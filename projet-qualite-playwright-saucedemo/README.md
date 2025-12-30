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