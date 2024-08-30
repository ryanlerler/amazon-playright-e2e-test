import { Page } from "playwright";

export class CartPage {
  constructor(private page: Page) {}

  async removeFromCart() {
    await this.page.click('input[value="Delete"]');
  }

  async isEmpty(): Promise<boolean> {
    return await this.page.isVisible("text=Your Amazon Cart is empty");
  }
}
