import type { Locator } from 'playwright'
import { testIds } from '../../../src/testIds.js'
import { AbstractPage } from './abstract-page.js'

export class MainPage extends AbstractPage {
  public door(doorNumber: number): Locator {
    return this.page.getByTestId(testIds.door(doorNumber).container)
  }

  public get stickButton(): Locator {
    return this.page.getByTestId(testIds.main.stickButton)
  }

  public get switchButton(): Locator {
    return this.page.getByTestId(testIds.main.switchButton)
  }

  public get resultMessage(): Locator {
    return this.page.getByTestId(testIds.main.resultMessage)
  }

  public get playAgainButton(): Locator {
    return this.page.getByTestId(testIds.main.playAgainButton)
  }

  public get toggleGlobalStatsButton(): Locator {
    return this.page.getByTestId(testIds.main.toggleGlobalStats)
  }

  public get globalStatistics(): Locator {
    return this.page.getByTestId(testIds.globalStats.container)
  }

  public get title(): Locator {
    return this.page.getByTestId(testIds.main.title)
  }

  public get gamesPlayed(): Locator {
    return this.page.getByTestId(testIds.globalStats.gamesPlayedValue)
  }

  public async getGamesPlayedCount(): Promise<number> {
    return Number.parseInt(await this.getTextContent(this.gamesPlayed))
  }

  public async waitForInitialStatsResponse() {
    return this.page.waitForResponse(
      (response) => response.url().includes('supabase.co/rest/v1/statistics') && response.status() === 200
    )
  }

  public async visit() {
    await this.open('/')
    await this.title.waitFor()
  }
}
