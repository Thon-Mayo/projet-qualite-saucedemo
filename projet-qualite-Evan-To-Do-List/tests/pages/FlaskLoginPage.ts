// POM de la page de login de Flask Lists
// Fournit des méthodes pour interagir avec cette page

import { Page, expect } from '@playwright/test'; // Importer Page et expect de Playwright

export class FlaskLoginPage {
  constructor(private page: Page) {} // Constructeur qui reçoit la page Playwright

  async login(email: string, pass: string) { // Remplit le formulaire de login avec un compte test et le valide
    await this.page.fill('input[type="email"]', email);
    await this.page.fill('input[type="password"]', pass);
    // Validation du formulaire de connexion via "Enter"
    await this.page.locator('input[type="password"]').press('Enter');
  }

  async expectUserLoggedIn() { // Vérifie qu'on est bien connecté en cherchant un élément visible uniquement pour les utilisateurs connectés
    // On cherche "Manage lists" qui apparaît uniquement quand on est connecté
    await expect(this.page.getByRole('link', { name: /manage lists/i })).toBeVisible();
    
    // autre méthode, on cherche l'email de l'utilisateur affiché en haut à droite
    // await expect(this.page.getByText('pilay23171@daikoa.com')).toBeVisible();
  }
}