import { Page } from "playwright";

export class ProductPage {
  constructor(private page: Page) {}

  async addToCart(quantity: number) {
    // Wait for the quantity dropdown to be available
    await this.page.waitForSelector("#quantity", { timeout: 10000 });

    // Select the desired quantity
    await this.page.selectOption("#quantity", quantity.toString());

    // Wait for the add-to-cart button to be available
    await this.page.waitForSelector("#add-to-cart-button", { timeout: 10000 });

    // Ensure the button is visible and enabled before clicking
    const isVisible = await this.page.isVisible("#add-to-cart-button");
    const isEnabled = await this.page.isEnabled("#add-to-cart-button");

    if (isVisible && isEnabled) {
      await this.page.click("#add-to-cart-button");
    } else {
      throw new Error("Add to Cart button is not interactable");
    }

    // Wait for the cart confirmation or redirection
    await this.page.waitForSelector("#nav-cart", { timeout: 10000 });
  }
}
