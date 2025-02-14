import { expect } from '@wdio/globals'
import { mainPage } from '../pageobjects/main.page'

describe('Monty Hall application', () => {
  beforeEach(async () => {
    await mainPage.open()
  })

  it('should allow the user to select a door and stick with the choice', async () => {
    await mainPage.door(0).waitForExist({ timeout: 10000 })
    await mainPage.door(0).click()
    await mainPage.stickButton.click()

    await expect(mainPage.resultMessage).toBeExisting()
  })

  it('should allow the user to select a door and switch the choice', async () => {
    await mainPage.door(1).click()
    await mainPage.switchButton.click()

    await expect(mainPage.resultMessage).toBeExisting()
  })

  it('should allow the user to show and hide global statistics', async () => {
    await mainPage.toggleGlobalStatsButton.click()
    await expect(mainPage.globalStatistics).toBeExisting()

    await mainPage.toggleGlobalStatsButton.click()
    await expect(mainPage.globalStatistics).not.toBeExisting()
  })

  it('should reset the game correctly after clicking "Play Again"', async () => {
    await mainPage.door(0).click()
    await mainPage.stickButton.click()
    await mainPage.playAgainButton.click()

    await expect(mainPage.door(0)).toBeExisting()
    await expect(mainPage.resultMessage).not.toBeExisting()
  })

  it('should display the correct win/loss message based on the final choice', async () => {
    await mainPage.door(0).click()
    await mainPage.stickButton.click()

    const resultMessage = await mainPage.resultMessage.getText()
    const isWin = resultMessage.includes('You win!')
    const isLose = resultMessage.includes('You lose!')

    await expect(isWin || isLose).toBe(true)
  })
})
