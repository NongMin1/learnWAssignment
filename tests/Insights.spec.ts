import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { BasePage } from "../pages/BasePage";
import { InsightsPage } from "../pages/InsightsPage";

test.describe("LearnWise test cases", () => {
  let loginPage: LoginPage;
  let basePage: BasePage;
  let insightsPage: InsightsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    basePage = new BasePage(page);
    insightsPage = new InsightsPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.EMAIL, process.env.PASSWORD);
  });

  test.describe("Postive test cases", () => {
    test("should apply 'Assistants' and 'Escalated' filters", async ({ page }) => {
      await basePage.navigateTo("Insights");
      await insightsPage.selectEscalationFilter("Escalated");
      await insightsPage.selectAssistantsFilter("Engineering Assistant");
      await expect(insightsPage.filtersApplied("Escalation: Escalated.")).toBeVisible();
      await expect(insightsPage.filtersApplied("Assistants: Engineering Assistant.")).toBeVisible();
    });
    //TODO cover: Using the “Assistants” and “Escalated” filters
    //TODO cover Clearing the selected filters
    //TODO  cover Checking widget data updates
    //TODO cover Checking shortcut button click breakdown updates
  });

  test.describe("Negative Test cases", () => {
    //TODO negative test cases can be covered here for Insights page.
  });
});
