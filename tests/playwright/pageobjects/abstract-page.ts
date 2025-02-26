import type { Locator, Page } from 'playwright'

export abstract class AbstractPage {
  protected page: Page

  constructor(page: Page) {
    this.page = page
  }

  public async open(path = '/') {
    await this.page.goto(path)
  }

  async getTextContent(locator: Locator): Promise<string> {
    const textContent = await locator.textContent()
    if (!textContent) {
      throw new Error('Error: No text content found')
    }
    return textContent
  }
}
