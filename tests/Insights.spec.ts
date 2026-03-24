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

  test.describe("Positive test cases", () => {
    test("should apply 'Assistants' and 'Escalated' filters", async ({}) => {
      await insightsPage.selectEscalationFilter("Escalated");
      await insightsPage.selectAssistantsFilter("Engineering Assistant");
      await expect(insightsPage.filtersApplied("Escalation: Escalated.")).toBeVisible();
      await expect(insightsPage.filtersApplied("Assistants: Engineering Assistant.")).toBeVisible();
    });

    test("should clear selected filters", async ({}) => {
      await insightsPage.selectEscalationFilter("Escalated");
      await insightsPage.selectAssistantsFilter("Engineering Assistant");
      await insightsPage.clearAllFilters();
      await expect(insightsPage.filtersApplied("Escalation: Escalated.")).toBeHidden();
      await expect(insightsPage.filtersApplied("Assistants: Engineering Assistant.")).toBeHidden();
    });

    test.fixme("should update widget data when filter is applied", async ({}) => {
      const before = await insightsPage.captureAllMetrics();
      await insightsPage.selectEscalationFilter("Escalated");
      const after = await insightsPage.captureAllMetrics();
      const changedFields = Object.keys(before).filter((key) => before[key as keyof typeof before] !== after[key as keyof typeof after]);

      expect(changedFields.length).toBeGreaterThan(0); //Fails because no data exist for this user
    });

    test.fixme("should update shortcut button click breakdown updates", async ({}) => {
      //TODO not clear which button I need to press. Need to clarify. Is it in Shortcut Button Clicks section or in diagram.
    });
  });

  test.describe("Negative test cases", () => {
    //TODO negative test cases can be covered here for Insights page.
  });
});
