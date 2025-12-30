import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { Page, expect } from '@playwright/test';
import { getPage } from '../support/hooks';

import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';


setDefaultTimeout(60_000);
let page: Page;
let login: LoginPage;
let products: ProductsPage;
let cart: CartPage;
let checkout: CheckoutPage;
let checkoutComplete: CheckoutCompletePage;
let firstProductName = '';

const log = (m: string) => console.log(`[STEPS] ${m}`);

Given(/que je suis sur la page de connexion Swag Labs/i, async function () {
  page = getPage();

  login = new LoginPage(page);
  products = new ProductsPage(page);
  cart = new CartPage(page);
  checkout = new CheckoutPage(page);
  checkoutComplete = new CheckoutCompletePage(page);

  log('Ouverture page login…');
  await login.goto(); 
  log('Login page affiché');
});

When(/^je me connecte avec "([^"]+)" et "([^"]+)"$/i, async function (user: string, pass: string) {
  log(`Connexion avec ${user}…`);
  await login.login(user, pass);
  log('Connexion OK.');
});




When(/je trie les produits par prix croissant/i, async function () {
  log('Tri Low→High…');
  await products.sortByPriceLowToHigh();
  log('Tri fait.');
});

When(/j'ajoute le premier produit au panier/i, async function () {
  firstProductName = await products.getFirstProductName();
  log(`Ajout panier: ${firstProductName}`);
  await products.addFirstProductToCart();
});

When(/j'ouvre le panier/i, async function () {
  log('Ouverture panier…');
  await products.openCart();
  // await cart.expectLoaded();
  log('Page panier OK.');
});

Then(/je vois ce produit dans le panier/i, async function () {
  log(`Vérification présence: ${firstProductName}`);
  await cart.expectItemPresent(firstProductName);
});

When(/je supprime ce produit du panier/i, async function () {
  log(`Suppression du produit: ${firstProductName}`);
  await cart.removeItem(firstProductName);
});

Then(/le panier est vide/i, async function () {
  log('Vérification panier vide :/ …');
  await cart.expectEmpty();
});

When(/je passe au paiement avec "([^"]+)" "([^"]+)" "([^"]+)"/i, async function (first: string, last: string, zip: string) {
  log(`Checkout: ${first} ${last} ${zip}`);
  await cart.checkout();
  await checkout.expectStepOne();
  await checkout.fillInformation(first, last, zip);
  await checkout.expectStepTwo();
  await checkout.finish();
});

Then(/je vois le message "([^"]+)"/i, async function (msg: string) {
  log(`Vérification message final: ${msg}`);
  await checkoutComplete.expectThankYou();
  await expect(page.locator('.complete-header')).toHaveText(msg);
  log('Commande terminé !');
});




Then(/^je vois un message d'erreur de connexion contenant "([^"]+)"$/i, async function (expected: string) {
  const msg = await login.getErrorMessage();
  log(`Erreur login détectée: ${msg}`);
  expect(msg).toContain(expected);
});




