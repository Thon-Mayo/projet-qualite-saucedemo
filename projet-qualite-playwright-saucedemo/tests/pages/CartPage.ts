import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async expectLoaded() {
    await expect(this.page.locator('.title')).toHaveText('Your Cart');
  }

  async expectItemPresent(name: string) {
    await expect(
      this.page.locator('.cart_item .inventory_item_name', { hasText: name })
    ).toBeVisible();
  }

  async checkout() {
    await this.page.locator('[data-test="checkout"]').click();
  }

  async removeItem(productName: string) {
  const item = this.page.locator('.cart_item', {
    has: this.page.locator('.inventory_item_name', { hasText: productName })
  });

  await item.locator('button:has-text("Remove")').click();
}

async expectEmpty() {
  await expect(this.page.locator('.cart_item')).toHaveCount(0);
}
}
