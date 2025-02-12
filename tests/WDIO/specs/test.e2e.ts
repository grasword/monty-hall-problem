import { expect } from '@wdio/globals'
import { mainPage } from '../pageobjects/main.page'

describe('Monty Hall application', () => {
  beforeEach(async () => {
    await mainPage.open()
  })

  it('should allow the user to select a door and stick with the choice', async () => {
    await mainPage.door(0).click()
    await mainPage.stickButton.click()

    await expect(mainPage.resultMessage).toBeExisting()
  })

  it('should allow the user to select a door and switch the choice', async () => {
    await mainPage.door(1).click()
    await mainPage.switchButton.click()

    await expect(mainPage.resultMessage).toBeExisting()
  })

  it('should allow the user to play again after a game', async () => {
    await mainPage.door(2).click()
    await mainPage.stickButton.click()

    await expect(mainPage.resultMessage).toBeExisting()

    await mainPage.playAgainButton.click()

    await expect(mainPage.door(0)).toBeExisting()
  })
})
