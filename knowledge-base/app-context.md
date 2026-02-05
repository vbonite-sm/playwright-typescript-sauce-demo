# Application Knowledge Base

This file serves as the "Long Term Memory" for the Test Framework.
The **Documenter** agent should populate this file after analyzing artifacts from the **Explorer**.

## 🗺️ Site Map

### 1. Login Page
*   **URL:** `/`
*   **Selectors:**
    *   Username Input: `[data-test="username"]`
    *   Password Input: `[data-test="password"]`
    *   Login Button: `[data-test="login-button"]`
    *   Error Container: `[data-test="error"]`

### 2. Inventory Page (PLP)
*   **URL:** `/inventory.html`
*   **Selectors:**
    *   Cart Link: `[data-test="shopping-cart-link"]`
    *   Sort Dropdown: `[data-test="product-sort-container"]`
    *   Product List: `[data-test="inventory-list"]`
    *   Product Item: `[data-test="inventory-item"]`
    *   *Dynamic:* Add to Cart Button (Relative to Item)

### 3. Cart Page
*   **URL:** `/cart.html`
*   **Selectors:**
    *   Checkout Button: `[data-test="checkout"]`
    *   Continue Shopping: `[data-test="continue-shopping"]`
    *   Cart List: `[data-test="cart-list"]`
    *   Cart Item: `[data-test="inventory-item"]`

### 4. Checkout: Step One (Info)
*   **URL:** `/checkout-step-one.html`
*   **Selectors:**
    *   First Name: `[data-test="firstName"]`
    *   Last Name: `[data-test="lastName"]`
    *   Postal Code: `[data-test="postalCode"]`
    *   Continue Button: `[data-test="continue"]`
    *   Cancel Button: `[data-test="cancel"]`

### 5. Checkout: Step Two (Overview)
*   **URL:** `/checkout-step-two.html`
*   **Selectors:**
    *   Finish Button: `[data-test="finish"]`
    *   Item List: `[data-test="cart-list"]`

### 6. Checkout: Complete
*   **URL:** `/checkout-complete.html`
*   **Selectors:**
    *   Header: `[data-test="complete-header"]` (e.g., "Thank you for your order!")
    *   Back Home: `[data-test="back-to-products"]`

## 🔄 User Flows
*   **Happy Path**: Login (Standard User) -> Inventory -> Add Item -> Cart -> Checkout (Info -> Overview -> Finish).
*   **Locked Out**: Login (Locked Out User) -> Error Message.

## 🧠 Selector Strategy
*   **Priority 1**: `[data-test="..."]` (Robust, Dev-defined).
*   **Priority 2**: ID selectors (e.g., `#user-name`).
*   **Avoid**: Text-based selectors or long XPaths.
