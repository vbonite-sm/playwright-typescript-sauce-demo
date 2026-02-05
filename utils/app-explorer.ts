import { chromium, Browser, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL || 'https://www.saucedemo.com';
const ARTIFACTS_DIR = path.join(__dirname, '../artifacts');

if (!fs.existsSync(ARTIFACTS_DIR)) {
  fs.mkdirSync(ARTIFACTS_DIR);
}

/**
 * THE DISCOVERY AGENT
 * mimics a user exploring the app to capture state for POM generation.
 */
async function runDiscoveryAgent() {
  console.log('🤖 Agent initializing...');
  
  const browser = await chromium.launch({ headless: false }); // Headed so you can see it
  const page = await browser.newPage();

  try {
    // 1. VISIT LOGIN
    console.log(`📍 Navigating to ${BASE_URL}`);
    await page.goto(BASE_URL);
    await captureState(page, 'login_page');

    // 2. ACT: PERFORM LOGIN
    console.log('🔑 Agent applying credentials...');
    if (await page.locator('[data-test="username"]').isVisible()) {
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');
    }

    // 3. VISIT INVENTORY
    await page.waitForURL('**/inventory.html');
    console.log('📦 Inventory accessed.');
    await captureState(page, 'inventory_page');

    // 4. ACT: INTERACT WITH ITEMS
    console.log('🛒 Adding items to cart...');
    const addToCartBtns = await page.locator('button:has-text("Add to cart")').all();
    if (addToCartBtns.length > 0) {
        await addToCartBtns[0].click(); // Add first item
        if (addToCartBtns.length > 1) await addToCartBtns[1].click(); // Add second item
    }

    // 5. VISIT CART
    console.log('🛒 Going to cart...');
    await page.click('.shopping_cart_link');
    await page.waitForURL('**/cart.html');
    await captureState(page, 'cart_page');

    // 6. ACT: CHECKOUT FLOW
    console.log('💳 Proceeding to checkout...');
    await page.click('[data-test="checkout"]');
    await page.waitForURL('**/checkout-step-one.html');
    await captureState(page, 'checkout_step_one');

    console.log('✍️ Filling details...');
    await page.fill('[data-test="firstName"]', 'AI');
    await page.fill('[data-test="lastName"]', 'Agent');
    await page.fill('[data-test="postalCode"]', '90210');
    await page.click('[data-test="continue"]');

    // 7. OVERVIEW
    await page.waitForURL('**/checkout-step-two.html');
    await captureState(page, 'checkout_overview');
    
    // 8. FINISH
    await page.click('[data-test="finish"]');
    await page.waitForURL('**/checkout-complete.html');
    await captureState(page, 'checkout_complete');

    console.log('✅ Discovery Complete. Artifacts saved.');

  } catch (error) {
    console.error('❌ Agent encountered an obstacle:', error);
  } finally {
    await browser.close();
  }
}

/**
 * HELPER: Captures the "DNA" of the page (HTML + Screenshot)
 */
async function captureState(page: Page, name: string) {
    console.log(`📸 Capturing state: ${name}`);
    
    // Save Screenshot
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, `${name}.png`) });

    // Save HTML Snapshot (Cleaned for token efficiency)
    let content = await page.content();
    // Optional: Strip massive SVG/Styles if needed, but raw is fine for now
    fs.writeFileSync(path.join(ARTIFACTS_DIR, `${name}.html`), content);
}

runDiscoveryAgent();
