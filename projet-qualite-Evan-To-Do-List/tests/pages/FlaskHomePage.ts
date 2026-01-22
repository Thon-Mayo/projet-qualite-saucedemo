// POM de la page d'accueil de Flask Lists
// Fournit des méthodes pour interagir avec cette page

import { Page, expect } from '@playwright/test'; // Importer Page et expect de Playwright

export class FlaskHomePage { 
  constructor(private page: Page) {} // Constructeur qui reçoit la page Playwright

  async goto() { // Navigue vers la page d'accueil
    await this.page.goto('https://flask.io/');
    await this.dismissPopups();
    // La page home contient "Really simple to-do lists you can share" donc on vérifie ça pour s'assurer qu'on est bien sur la bonne page
    await expect(this.page.getByRole('heading', { name: /to-do lists you can share/i })).toBeVisible();
  }

  async clickCreateList() { // Clique sur le lien pour créer une nouvelle liste
    await this.dismissPopups();
    await this.page.getByRole('link', { name: /create a to-do list/i }).click();
  }

  async clickLoginLink() { // Clique sur le lien de connexion
    await this.dismissPopups();
    await this.page.getByRole('link', { name: 'Log in' }).click(); // Le texte du lien de login est "Log in"
  }

  async dismissPopups() { // Gère les potentiels popups (notifications, cookies, ...)
    // Popup notifications "Maybe later"
    const maybeLater = this.page.getByRole('button', { name: /maybe later/i });
    if (await maybeLater.isVisible()) {
      await maybeLater.click();
    }

    // Bandeau cookies "OK"
    const cookiesOk = this.page.getByRole('button', { name: /^OK$/ });
    if (await cookiesOk.isVisible()) {
      await cookiesOk.click();
    }
  }
}