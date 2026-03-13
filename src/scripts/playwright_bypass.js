const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const context = browser.contexts()[0];
  const page = context.pages().find(p => p.url().includes('admin/products/QsP0ZDdjTR3b9t7FrsUH'));
  
  if (!page) {
    console.error("Could not find the open admin page!");
    process.exit(1);
  }

  console.log("Found Adming Page! Expanding accordion...");
  await page.click('text=Advanced Configuration');
  
  console.log("Setting dimensions...");
  await page.fill('input[placeholder="H"]', '2');
  await page.fill('input[placeholder="Dia"]', '3.2');
  
  console.log("Setting Closure specs...");
  await page.fill('input[placeholder="e.g. Pump, Sprayer, Continuous Thread"]', 'Continuous Thread');
  await page.fill('input[placeholder="e.g. Black, White, Silver"]', 'Silver');
  
  console.log("Saving...");
  await page.click('button:has-text("Save Changes")');
  
  console.log("Done. Waiting 2 seconds for save...");
  await page.waitForTimeout(2000);
  console.log("Success. UI manipulated via Playwright code.");
  process.exit(0);
})();
