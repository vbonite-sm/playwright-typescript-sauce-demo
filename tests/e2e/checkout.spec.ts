import { test, expect } from '../../fixtures/pom.fixture';
import * as users from '../../test-data/users.json';

test.describe('Checkout Feature', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    const user = users.standard_user;
    await loginPage.login(user.username, user.password);
  });

  test('should complete the checkout flow successfully', async ({ 
    inventoryPage, 
    cartPage, 
    checkoutStepOnePage, 
    checkoutStepTwoPage, 
    checkoutCompletePage 
  }) => {
    // Arrange: Add item to cart
    await inventoryPage.addItemToCartByIndex(0);
    await inventoryPage.gotoCart();

    // Act: Proceed through checkout
    await cartPage.proceedToCheckout();
    await checkoutStepOnePage.fillDetails('AI', 'Bot', '90210');
    await checkoutStepOnePage.continue();
    await checkoutStepTwoPage.finish();

    // Assert: Verify order completion
    await expect(checkoutCompletePage.header).toHaveText('Thank you for your order!');
    await expect(checkoutCompletePage.page).toHaveURL(/.*checkout-complete.html/);
  });
});
