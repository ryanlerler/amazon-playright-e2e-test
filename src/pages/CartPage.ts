import { Page } from "playwright";

export class CartPage {
  constructor(private page: Page) {}

  async removeFromCart() {
    await this.page.click('input[value="Delete"]');
  }

  async isEmpty(): Promise<boolean> {
    // Log the inner text of the cart to see what is actually there
    const cartText = await this.page.textContent(
      "h2.a-size-extra-large.a-spacing-mini.a-spacing-top-base.a-text-normal"
    );
    console.log("Cart Text:", cartText);

    // Use a more specific selector to check visibility
    return await this.page.isVisible(
      "h2.a-size-extra-large.a-spacing-mini.a-spacing-top-base.a-text-normal:has-text('Your Amazon Cart is empty.')"
    );
  }
}
