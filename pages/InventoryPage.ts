import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly headerTitle: Locator;
  readonly productList: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.headerTitle = page.locator('.title');
    this.productList = page.locator('[data-test="inventory-list"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  /**
   * Adds an item to the cart by its index (0-based)
   */
  async addItemToCartByIndex(index: number) {
    const item = this.productList.locator('[data-test="inventory-item"]').nth(index);
    const addToCartButton = item.locator('button:has-text("Add to cart")');
    await addToCartButton.click();
  }

  async gotoCart() {
    await this.cartLink.click();
  }
}
