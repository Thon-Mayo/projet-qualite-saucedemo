import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
    await expect(this.page.getByPlaceholder('Username')).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.page.locator('[data-test="username"]').fill(username);
    await this.page.locator('[data-test="password"]').fill(password);
    await this.page.locator('[data-test="login-button"]').click();
  }

  async getErrorMessage(): Promise<string> {
  const msg = await this.page.locator('[data-test="error"]').textContent();
  return (msg ?? '').trim();
}

}
