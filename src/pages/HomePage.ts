import { Page } from "playwright";

export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto("https://www.amazon.sg/");
  }

  async searchForProduct(productName: string) {
    await this.page.fill('input[name="field-keywords"]', productName);
    await this.page.press('input[name="field-keywords"]', "Enter");
  }

  async filterByBrand(brandName: string) {
    await this.page.click(`text=${brandName}`);
  }

  async selectProduct(productName: string) {
    await this.page.waitForSelector(`text=${productName}`);
    await this.page.click(`text=${productName}`);
  }
}
