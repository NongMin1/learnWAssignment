import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly continueButton: Locator;
  readonly passwordInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
  }

  async goto() {
    if (!process.env.BASE_URL) {
      throw new Error("BASE_URL environment variable is not set.");
    }
    await this.page.goto(process.env.BASE_URL);
  }

  async login(email?: string, password?: string) {
    if (!email || !password) {
      throw new Error("EMAIL and/or PASSWORD environment variables are not set.");
    }

    await this.emailInput.fill(email);
    await this.continueButton.click();

    await this.passwordInput.fill(password);
    await this.continueButton.click();
  }
}
