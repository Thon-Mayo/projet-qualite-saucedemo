// Centralise la création/fermeture du navigateur
// Fournit la page aux steps avec getPage()
// hooks.ts est automatiquement chargé par Cucumber avant les steps

import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, firefox, webkit, Browser, Page } from '@playwright/test';

setDefaultTimeout(60_000);

let browser: Browser;
let page: Page;

export function getPage() { // Donne la page Playwright aux steps
  return page;
}

function getBrowserType() { // Trouve le type de navigateur selon la variable d'environnement BROWSER
  const name = (process.env.BROWSER ?? 'chromium').toLowerCase();
  if (name === 'firefox') return firefox;
  if (name === 'webkit') return webkit;
  return chromium; // par défaut
}

Before(async () => { // Avant chaque scénario
  const browserType = getBrowserType(); // Récupère le type de navigateur
  browser = await browserType.launch({ headless: false }); // Lance le navigateur en mode visible
  page = await browser.newPage(); // Ouvre un nouvel onglet/page
});

After(async () => { // Après chaque scénario
  await page?.close(); // Ferme la page
  await browser?.close(); // Ferme le navigateur
});
