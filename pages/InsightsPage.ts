import { Page, Locator } from "@playwright/test";

export class InsightsPage {
  readonly page: Page;
  readonly filtersButton: Locator;
  readonly escalationFilter: Locator;
  readonly assistantsFilter: Locator;
  readonly filtersPanel: Locator;
  readonly closeFiltersButton: Locator;
  readonly filtersApplied: (name: string) => Locator;
  readonly clearFiltersButton: Locator;
  readonly widgetCard: Locator;

  constructor(page: Page) {
    this.page = page;

    this.filtersButton = page.getByRole("button", { name: "Open filters panel" });
    this.escalationFilter = page.getByPlaceholder("All Escalations");
    this.assistantsFilter = page.getByLabel("Assistants");
    this.filtersPanel = page.locator("dialog#filters-panel");
    this.closeFiltersButton = page.getByRole("button", { name: "Close" });
    this.filtersApplied = (name: string) => this.page.locator(`[aria-label^="${name}"]`);
    this.clearFiltersButton = page.getByRole("button", { name: "Clear all filters" });
    this.widgetCard = page.locator("article");
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

  async clearAllFilters() {
    await this.openFilters();
    await this.clearFiltersButton.click();
    await this.closeFiltersButton.click();
  }

  async getWidgetValue(title: string): Promise<string> {
    const card = this.widgetCard.filter({ hasText: title });

    const valueElement = card
      .locator("div.mantine-Text-root")
      .filter({
        hasNot: this.page.locator("button"),
      })
      .first();

    const text = await valueElement.innerText();
    return text.trim();
  }

  async captureAllMetrics() {
    return {
      aiResolution: await this.getWidgetValue("AI Resolution Rate"),
      answerRating: await this.getWidgetValue("Answer Rating"),
      conversations: await this.getWidgetValue("Number of Conversations"),
      escalated: await this.getWidgetValue("Escalated to Human"),
      languages: await this.getWidgetValue("Languages Spoken"),
      aiAnswers: await this.getWidgetValue("Number of AI Answers"),
      uniqueUsers: await this.getWidgetValue("Unique Users"),
      conversationsPerUser: await this.getWidgetValue("Conversations / User"),
      answersPerConversation: await this.getWidgetValue("Answers / Conversation"),
      shortcutClicks: await this.getWidgetValue("Shortcut Button Clicks"),
    };
  }
}
