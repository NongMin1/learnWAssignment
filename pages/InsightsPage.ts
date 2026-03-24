import { Page, Locator } from "@playwright/test";

export class InsightsPage {
  readonly page: Page;
  readonly filtersButton: Locator;
  readonly escalationFilter: Locator;
  readonly assistantsFilter: Locator;
  readonly filtersPanel: Locator;
  readonly closeFiltersButton: Locator;
  readonly filtersApplied: (name: string) => Locator;

  constructor(page: Page) {
    this.page = page;

    this.filtersButton = page.getByRole("button", { name: "Open filters panel" });
    this.escalationFilter = page.getByPlaceholder("All Escalations");
    this.assistantsFilter = page.getByLabel("Assistants");
    this.filtersPanel = page.locator("dialog#filters-panel");
    this.closeFiltersButton = page.getByRole("button", { name: "Close" });
    this.filtersApplied = (name: string) => this.page.locator(`[aria-label^="${name}"]`);
  }

  //actions

  async openFilters() {
    await this.filtersPanel.waitFor({ state: "hidden" });
    await this.filtersButton.click();
    await this.filtersPanel.waitFor({ state: "visible" });
  }

  async selectEscalationFilter(option: "All Escalations" | "Not Escalated" | "Escalated") {
    await this.openFilters();
    await this.escalationFilter.click();
    await this.page.getByRole("option", { name: option, exact: true }).click();
  }

  async selectAssistantsFilter(option: "Engineering Assistant") {
    await this.openFilters();
    await this.assistantsFilter.evaluate((node) => {
      node.scrollIntoView({ block: "center", behavior: "smooth" });
    });
    await this.assistantsFilter.click();
    await this.page.getByRole("option", { name: option, exact: true }).click();
    await this.closeFiltersButton.click();
  }
}
