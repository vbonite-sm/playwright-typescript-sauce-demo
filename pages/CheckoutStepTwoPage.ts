import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutStepTwoPage extends BasePage {
  readonly finishButton: Locator;
  readonly itemList: Locator;

  constructor(page: Page) {
    super(page);
    this.finishButton = page.locator('[data-test="finish"]');
    this.itemList = page.locator('[data-test="cart-list"]');
  }

  async finish() {
    await this.finishButton.click();
  }
}
