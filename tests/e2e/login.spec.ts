import { test, expect } from '../../fixtures/pom.fixture';
import * as users from '../../test-data/users.json';

test.describe('Login Feature', () => {

  test.beforeEach(async ({ loginPage }) => {
    // Arrange: Go to the site
    await loginPage.navigate();
  });

  test('should login successfully with standard user', async ({ loginPage, inventoryPage }) => {
    // Arrange
    const user = users.standard_user;

    // Act
    await loginPage.login(user.username, user.password);

    // Assert
    await expect(inventoryPage.headerTitle).toHaveText('Products');
    await expect(inventoryPage.page).toHaveURL(/.*inventory.html/);
  });

  test('should show error for locked out user', async ({ loginPage }) => {
    // Arrange
    const user = users.locked_out_user;

    // Act
    await loginPage.login(user.username, user.password);

    // Assert
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });
});
