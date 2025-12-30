import { Page, expect } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  async expectLoaded() {
    await expect(this.page.locator('.title')).toHaveText('Products');
  }

  async sortByPriceLowToHigh() {
    await this.page.locator('[data-test="product-sort-container"]').selectOption('lohi');
  }

  async getFirstProductName(): Promise<string> {
    const name = await this.page.locator('.inventory_item_name').first().textContent();
    return (name ?? '').trim();
  }

  async addFirstProductToCart() {
    const firstItem = this.page.locator('.inventory_item').first();
    await firstItem.locator('button:has-text("Add to cart")').click();
    await expect(this.page.locator('.shopping_cart_badge')).toHaveText('1');
  }

  async openCart() {
    await this.page.locator('.shopping_cart_link').click();
  }
}
