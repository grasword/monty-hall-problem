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
}

export const mainPage = new MainPage()
