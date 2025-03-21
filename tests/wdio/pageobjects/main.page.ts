import { $ } from '@wdio/globals'
import { testIds } from '../../../src/testIds.js'
import { getByTestId } from '../helpers.js'
import { Page } from './page.js'

class MainPage extends Page {
  public door(doorNumber: number) {
    return $(getByTestId(testIds.door(doorNumber).container))
  }

  public get stickButton() {
    return $(getByTestId(testIds.main.stickButton))
  }

  public get switchButton() {
    return $(getByTestId(testIds.main.switchButton))
  }

  public get resultMessage() {
    return $(getByTestId(testIds.main.resultMessage))
  }

  public get playAgainButton() {
    return $(getByTestId(testIds.main.playAgainButton))
  }

  public get toggleGlobalStatsButton() {
    return $(getByTestId(testIds.main.toggleGlobalStats))
  }

  public get globalStatistics() {
    return $(getByTestId(testIds.globalStats.container))
  }

  public get title() {
    return $(getByTestId(testIds.main.title))
  }

  public get gamesPlayed() {
    return $(getByTestId(testIds.globalStats.gamesPlayedValue))
  }

  public async visit() {
    await this.open('/')
    await this.title.waitForDisplayed()
  }
}

export const mainPage = new MainPage()
