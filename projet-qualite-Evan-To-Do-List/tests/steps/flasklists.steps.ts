// traduction de chaques phrases Gherkin en actions Playwright

import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { Page } from '@playwright/test';
import { getPage } from '../support/hooks';

import { FlaskHomePage } from '../pages/FlaskHomePage';
import { FlaskListPage } from '../pages/FlaskListPage';
import { FlaskLoginPage } from '../pages/FlaskLoginPage';

setDefaultTimeout(60_000);

let page: Page;
let home: FlaskHomePage;
let list: FlaskListPage;
let loginPage: FlaskLoginPage;

const log = (m: string) => console.log(`[STEPS] ${m}`);

Given('que je suis sur la page d\'accueil Flask Lists', async function () { // Navigue vers la page d'accueil
  page = getPage();
  home = new FlaskHomePage(page);
  list = new FlaskListPage(page);
  loginPage = new FlaskLoginPage(page);

  log('Ouverture Flask Lists…');
  await home.goto();
});

When('je crée une nouvelle liste', async function () { // Clique sur le lien pour créer une nouvelle liste
  log('Création nouvelle liste…');
  await home.clickCreateList();
});

Then('je suis sur la page de création de liste', async function () { // Vérifie qu'on est bien sur la page de création de liste
  log('Vérification page /new…');
  await list.expectOnNewListPage();
});

When(/^j'ajoute la tâche "([^"]+)"$/, async function (task: string) { // Ajoute une tâche
  log(`Ajout tâche: ${task}`);
  await list.addTask(task);
});

Then(/^je vois la tâche "([^"]+)"$/, async function (task: string) { // Vérifie qu'une tâche est visible
  log(`Vérification tâche visible: ${task}`);
  await list.expectTaskVisible(task);
});

When(/^je supprime la tâche "([^"]+)"$/, async function (task: string) { // Supprime une tâche
  log(`Suppression tâche: ${task}`);
  await list.deleteTask(task);
});

Then(/^je ne vois plus la tâche "([^"]+)"$/, async function (task: string) { // Vérifie qu'une tâche n'est plus visible
  log(`Vérification tâche absente: ${task}`);
  await list.expectTaskNotVisible(task);
});

When('je vais sur la page de connexion', async function () { // Clique sur le lien de connexion
  log('Navigation vers Login...');
  await home.clickLoginLink();
});

When('je me connecte avec {string} et le mot de passe {string}', async function (email: string, pass: string) { // Remplit le formulaire de login et le valide
  log(`Tentative de connexion avec ${email}`);
  await loginPage.login(email, pass);
});

Then('je vois que je suis connecté', async function () { // Vérifie qu'on est bien connecté
  log('Vérification connexion réussie...');
  await loginPage.expectUserLoggedIn();
});