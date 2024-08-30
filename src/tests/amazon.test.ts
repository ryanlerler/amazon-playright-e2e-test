import { Browser, chromium, Page } from "playwright";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";

describe("Amazon E2E Test", () => {
  let browser: Browser;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
  });

  afterAll(async () => {
    await browser.close();
  });

  it("should perform search, add to cart, and remove from cart", async () => {
    const page: Page = await browser.newPage();

    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    // 1. Open Amazon.sg
    await homePage.open();

    // 2. Search for a product and filter by brand
    await homePage.searchForProduct("laptop");
    await homePage.filterByBrand("Dell");

    // 3. Wait for the product listing to load
    await page.waitForSelector("text=Dell Inspiron 15", { timeout: 15000 });

    // 4. Select a specific product
    await homePage.selectProduct("Dell Inspiron 15");

    // 5. Wait for the product page to load
    await page.waitForSelector("#add-to-cart-button", { timeout: 15000 });

    // 6. Add the product to the cart with specific quantity
    await productPage.addToCart(1);

    // 7. Navigate to the cart
    await page.waitForNavigation();
    await page.click("#nav-cart");

    // 8. Wait for the cart page to load
    await page.waitForSelector('input[value="Delete"]', { timeout: 15000 });

    // 9. Remove the product from the cart
    await cartPage.removeFromCart();

    // 10. Verify cart is empty
    const isEmpty = await cartPage.isEmpty();
    expect(isEmpty).toBeTruthy();

    await page.close();
  }, 60000); // Increase timeout to 60 seconds
});
