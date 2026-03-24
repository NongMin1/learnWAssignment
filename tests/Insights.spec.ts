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
    await basePage.navigateTo("Insights");
  });

  test.describe("Postive test cases", () => {
    test("should apply 'Assistants' and 'Escalated' filters", async ({ page }) => {
      await insightsPage.selectEscalationFilter("Escalated");
      await insightsPage.selectAssistantsFilter("Engineering Assistant");
      await expect(insightsPage.filtersApplied("Escalation: Escalated.")).toBeVisible();
      await expect(insightsPage.filtersApplied("Assistants: Engineering Assistant.")).toBeVisible();
    });

    test("should clear selected filters", async ({ page }) => {
      await insightsPage.selectEscalationFilter("Escalated");
      await insightsPage.selectAssistantsFilter("Engineering Assistant");
      await insightsPage.clearAllFilters();
      await expect(insightsPage.filtersApplied("Escalation: Escalated.")).toBeHidden();
      await expect(insightsPage.filtersApplied("Assistants: Engineering Assistant.")).toBeHidden();
    });

    test("should update widget data when filter is applied", async ({ page }) => {
      const before = await insightsPage.captureAllMetrics();
      console.log("Before state:", before);

      await insightsPage.selectEscalationFilter("Escalated");

      const after = await insightsPage.captureAllMetrics();
      console.log("After state:", after);

      const changedFields = Object.keys(before).filter((key) => before[key as keyof typeof before] !== after[key as keyof typeof after]);

      console.log("Fields that changed:", changedFields);

      expect(changedFields.length).toBeGreaterThan(0); //Fails because no data exist for this user
    });
    //TODO
    test("should update shortcut button click breakdown updates", async ({ page }) => {
      await basePage.navigateTo("Insights");
      const initialBreakdown = await insightsPage.shortcutBreakdown.innerText();
      await insightsPage.selectAssistantsFilter("Engineering Assistant");
      await expect(insightsPage.shortcutBreakdown).not.toHaveText(initialBreakdown);
    });
  });

  test.describe("Negative Test cases", () => {
    //TODO negative test cases can be covered here for Insights page.
  });
});
