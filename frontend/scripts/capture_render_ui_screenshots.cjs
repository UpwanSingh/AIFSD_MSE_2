const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const BASE_URL = "https://student-grievance-frontend-od85.onrender.com";
const SHOTS_DIR = "/Users/upwansingh/Desktop/AIFSD_MSE_2/evidence/screenshots_render";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  fs.mkdirSync(SHOTS_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const timestamp = Date.now();
  const email = `render_ui_${timestamp}@example.com`;
  const password = "123456";

  await page.goto(`${BASE_URL}`, { waitUntil: "networkidle" });
  if (!page.url().includes("/register")) {
    await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
    const registerLink = page.locator('a:has-text("Register")').first();
    if (await registerLink.count()) {
      await registerLink.click();
      await page.waitForURL("**/register", { timeout: 15000 });
    }
  }
  await page.screenshot({ path: path.join(SHOTS_DIR, "01_render_register_page.png"), fullPage: true });

  await page.fill('input[name="name"]', "Render UI Student");
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await wait(1600);
  await page.screenshot({ path: path.join(SHOTS_DIR, "02_render_register_success.png"), fullPage: true });

  await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
  if (!page.url().includes("/login")) {
    const loginLink = page.locator('a:has-text("Login")').first();
    if (await loginLink.count()) {
      await loginLink.click();
      await page.waitForURL("**/login", { timeout: 15000 });
    }
  }
  await page.screenshot({ path: path.join(SHOTS_DIR, "03_render_login_page.png"), fullPage: true });

  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await Promise.all([
    page.waitForURL("**/dashboard", { timeout: 30000 }),
    page.click('button[type="submit"]'),
  ]);

  await wait(2000);
  await page.screenshot({ path: path.join(SHOTS_DIR, "04_render_dashboard_page.png"), fullPage: true });

  const title = `Render grievance ${timestamp}`;
  await page.fill('input[name="title"]', title);
  await page.fill('textarea[name="description"]', "Render deployed app test grievance.");
  await page.selectOption('select[name="category"]', "Other");
  await page.selectOption('select[name="status"]', "Pending");
  await page.click('button[type="submit"]');
  await wait(1800);
  await page.screenshot({ path: path.join(SHOTS_DIR, "05_render_submit_grievance.png"), fullPage: true });

  await page.fill('input[placeholder="Search by title"]', "Render grievance");
  await page.click('button:has-text("Search")');
  await wait(1200);
  await page.screenshot({ path: path.join(SHOTS_DIR, "06_render_search_grievance.png"), fullPage: true });

  await page.click('button:has-text("Update")');
  await wait(700);
  await page.selectOption('select[name="status"]', "Resolved");
  await page.click('button[type="submit"]');
  await wait(1200);
  await page.screenshot({ path: path.join(SHOTS_DIR, "07_render_update_grievance.png"), fullPage: true });

  await page.click('button:has-text("Delete")');
  await wait(1200);
  await page.screenshot({ path: path.join(SHOTS_DIR, "08_render_delete_grievance.png"), fullPage: true });

  await page.click('button:has-text("Logout")');
  await page.waitForURL("**/login", { timeout: 15000 });
  await wait(800);
  await page.screenshot({ path: path.join(SHOTS_DIR, "09_render_logout.png"), fullPage: true });

  await browser.close();
  console.log("Render UI screenshots saved in:");
  console.log(SHOTS_DIR);
})();
