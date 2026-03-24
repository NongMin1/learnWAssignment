import { Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(menuItem: string) {
    await this.page.getByText(menuItem).click();
  }
}
