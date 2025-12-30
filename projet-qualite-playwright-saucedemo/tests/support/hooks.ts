import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';

setDefaultTimeout(60_000);

let browser: Browser;
let page: Page;

export function getPage() {
  return page;
}

Before(async () => {
  browser = await chromium.launch({ headless: false }); // passe à true pour CI
  page = await browser.newPage();
});

After(async () => {
  await page?.close();
  await browser?.close();
});
