import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async expectStepOne() {
    await expect(this.page.locator('.title')).toHaveText('Checkout: Your Information');
  }

  async fillInformation(first: string, last: string, zip: string) {
    await this.page.locator('[data-test="firstName"]').fill(first);
    await this.page.locator('[data-test="lastName"]').fill(last);
    await this.page.locator('[data-test="postalCode"]').fill(zip);
    await this.page.locator('[data-test="continue"]').click();
  }

  async expectStepTwo() {
    await expect(this.page.locator('.title')).toHaveText('Checkout: Overview');
  }

  async finish() {
    await this.page.locator('[data-test="finish"]').click();
  }
}