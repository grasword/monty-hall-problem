import { expect, test } from '@playwright/test'
import { MainPage } from '../pageobjects/main-page.js'

test.describe('Monty Hall application', () => {
  let mainPage: MainPage

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page)
    await mainPage.visit()
  })

  test('should allow the user to select a door and stick with the choice', async () => {
    const selectedDoorClass = /bg-yellow-400/

    await mainPage.door(0).click()
    await expect(mainPage.door(0)).toHaveClass(selectedDoorClass)

    await mainPage.stickButton.click()

    await expect(mainPage.resultMessage).toBeVisible()
  })

  test('should allow the user to select a door and switch the choice', async () => {
    await mainPage.door(1).click()

    await mainPage.switchButton.click()

    await expect(mainPage.resultMessage).toBeVisible()
  })

  test.skip('should allow the user to show and hide global statistics', async () => {
    await expect(mainPage.globalStatistics).not.toBeVisible()
    await mainPage.toggleGlobalStatsButton.click()
    await expect(mainPage.globalStatistics).toBeVisible()

    await mainPage.toggleGlobalStatsButton.click()
    await expect(mainPage.globalStatistics).not.toBeVisible()
  })

  test('should reset the game correctly after clicking "Play Again"', async () => {
    await mainPage.door(0).click()

    await mainPage.stickButton.click()
    await mainPage.playAgainButton.click()

    await expect(mainPage.door(0)).toBeVisible()
    await expect(mainPage.resultMessage).not.toBeVisible()
  })

  test.skip('should display the correct win/loss message based on the final choice', async () => {
    await mainPage.door(2).click()

    await mainPage.switchButton.click()

    const resultMessage = await mainPage.getTextContent(mainPage.resultMessage)
    const isWin = resultMessage.includes('You win!')
    const isLose = resultMessage.includes('You lose!')

    expect(isWin || isLose).toBe(true)
  })

  test.skip('should update the global statistics after each game', async () => {
    await mainPage.waitForInitialStatsResponse()
    await mainPage.toggleGlobalStatsButton.click()

    const initialGamesPlayed = await mainPage.getGamesPlayedCount()

    await mainPage.door(1).click()

    await mainPage.stickButton.click()

    await expect(async () => {
      const newGamesPlayed = await mainPage.getGamesPlayedCount()
      expect(newGamesPlayed).toBeGreaterThan(initialGamesPlayed)
    }).toPass()
  })
})
