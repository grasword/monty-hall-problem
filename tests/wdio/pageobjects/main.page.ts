import { $ } from '@wdio/globals'
import { testIds } from '../../../src/testIds.js'
import { getByTestId } from '../helpers.js'
import { Page } from './page.js'

class MainPage extends Page {
  public door(doorNumber: number) {
    return $(getByTestId(testIds.door(doorNumber).container))
  }

  public get stickButton() {
    return $(getByTestId(testIds.app.stickButton))
  }

  public get switchButton() {
    return $(getByTestId(testIds.app.switchButton))
  }

  public get resultMessage() {
    return $(getByTestId(testIds.app.resultMessage))
  }

  public get playAgainButton() {
    return $(getByTestId(testIds.app.playAgainButton))
  }

  public get toggleGlobalStatsButton() {
    return $(getByTestId(testIds.app.toggleGlobalStats))
  }

  public get globalStatistics() {
    return $(getByTestId(testIds.globalStats.container))
  }

  public get title() {
    return $(getByTestId(testIds.app.title))
  }

  public async visit() {
    await this.open('/')
    await this.title.waitForDisplayed()
  }
}

export const mainPage = new MainPage()
