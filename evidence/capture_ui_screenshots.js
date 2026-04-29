const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const BASE_URL = "http://localhost:5173";
const SHOTS_DIR = "/Users/upwansingh/Desktop/AIFSD_MSE_2/evidence/screenshots";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  fs.mkdirSync(SHOTS_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const timestamp = Date.now();
  const email = `auto_${timestamp}@example.com`;
  const password = "123456";

  // Register page
  await page.goto(`${BASE_URL}/register`, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(SHOTS_DIR, "01_register_page.png"), fullPage: true });

  await page.fill('input[name="name"]', "Auto Student");
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await wait(1200);
  await page.screenshot({ path: path.join(SHOTS_DIR, "02_register_success.png"), fullPage: true });

  // Login page
  await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(SHOTS_DIR, "03_login_page.png"), fullPage: true });

  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await Promise.all([
    page.waitForURL("**/dashboard", { timeout: 15000 }),
    page.click('button[type="submit"]'),
  ]);

  await wait(1000);
  await page.screenshot({ path: path.join(SHOTS_DIR, "04_dashboard_page.png"), fullPage: true });

  // Submit grievance
  const title = `Mess issue ${timestamp}`;
  await page.fill('input[name="title"]', title);
  await page.fill('textarea[name="description"]', "Food quality needs improvement.");
  await page.selectOption('select[name="category"]', "Hostel");
  await page.selectOption('select[name="status"]', "Pending");
  await page.click('button[type="submit"]');
  await wait(1300);
  await page.screenshot({ path: path.join(SHOTS_DIR, "05_submit_grievance_success.png"), fullPage: true });

  // Search grievance
  await page.fill('input[placeholder="Search by title"]', "Mess");
  await page.click('button:has-text("Search")');
  await wait(1000);
  await page.screenshot({ path: path.join(SHOTS_DIR, "06_search_grievance.png"), fullPage: true });

  // Update grievance
  await page.click('button:has-text("Update")');
  await wait(500);
  await page.selectOption('select[name="status"]', "Resolved");
  await page.click('button[type="submit"]');
  await wait(1000);
  await page.screenshot({ path: path.join(SHOTS_DIR, "07_update_grievance.png"), fullPage: true });

  // Delete grievance
  await page.click('button:has-text("Delete")');
  await wait(1000);
  await page.screenshot({ path: path.join(SHOTS_DIR, "08_delete_grievance.png"), fullPage: true });

  // Logout
  await page.click('button:has-text("Logout")');
  await page.waitForURL("**/login", { timeout: 10000 });
  await wait(600);
  await page.screenshot({ path: path.join(SHOTS_DIR, "09_logout_to_login.png"), fullPage: true });

  await browser.close();

  console.log("UI screenshots saved in:");
  console.log(SHOTS_DIR);
})();
