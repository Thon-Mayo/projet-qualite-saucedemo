// POM de la page de liste de tâches de Flask Lists
// Fournit des méthodes pour interagir avec cette page

import { Page, expect } from '@playwright/test'; // Importer Page et expect de Playwright

export class FlaskListPage {
  constructor(private page: Page) {} // Constructeur qui reçoit la page Playwright

  async expectOnNewListPage() { // Vérifie qu'on est bien sur la page de création de liste en cherchant le champ de saisie
    await expect(this.page.getByRole('textbox')).toBeVisible();
  }

  async addTask(task: string) { // Ajoute une tâche en la saisissant et validant par "Enter"
    const input = this.page.getByRole('textbox');
    await input.fill(task);
    await input.press('Enter');
  }

  async expectTaskVisible(task: string) { // Vérifie qu'une tâche est visible dans la liste
    await expect(this.page.getByText(task, { exact: true })).toBeVisible();
  }

  async deleteTask(task: string) { // Supprime une tâche en cliquant sur la croix et gérant la popup de confirmation
    // On trouve la ligne
    const row = this.page.locator('div', { hasText: task }).last();
    // On survole la ligne pour faire apparaître le lien "Delete task"
    await row.hover();
    // On prépare la gestion de la popup de confirmation (pour confirmer qu'on veut bien supprimer la tâche)
    // On dit à la page : "La prochaine fois qu'une boîte de dialogue s'ouvre, clique sur OK (pour accepter la suppression)"
    this.page.once('dialog', async dialog => {
        console.log(`Popup détectée : ${dialog.message()}`);
        await dialog.accept();
    });
    // 4. On clique sur supprimer (ce qui va faire apparaître la fenêtre popup dont on s'est occupé juste avant)
    await row.getByRole('link', { name: /Delete task/i }).click();
  }

  async expectTaskNotVisible(task: string) { // Vérifie qu'une tâche n'est plus visible dans la liste
    await expect(this.page.getByText(task, { exact: true })).toHaveCount(0);
  }
}