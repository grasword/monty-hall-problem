import { expect } from '@wdio/globals'
import { waitForTextChange } from '../helpers.ts'
import { mainPage } from '../pageobjects/main.page'

describe('Monty Hall application', () => {
  beforeEach(async () => {
    await mainPage.visit()
  })

  it('should allow the user to select a door and stick with the choice', async () => {
    await mainPage.door(0).click()
    await mainPage.stickButton.click()

    await expect(mainPage.resultMessage).toBeDisplayed()
  })

  it('should allow the user to select a door and switch the choice', async () => {
    await mainPage.door(1).click()
    await mainPage.switchButton.click()

    await expect(mainPage.resultMessage).toBeDisplayed()
  })

  it('should allow the user to show and hide global statistics', async () => {
    await mainPage.toggleGlobalStatsButton.click()
    await expect(mainPage.globalStatistics).toBeDisplayed()

    await mainPage.toggleGlobalStatsButton.click()
    await expect(mainPage.globalStatistics).not.toBeDisplayed()
  })

  it('should reset the game correctly after clicking "Play Again"', async () => {
    await mainPage.door(0).click()
    await mainPage.stickButton.click()
    await mainPage.playAgainButton.click()

    await expect(mainPage.door(0)).toBeDisplayed()
    await expect(mainPage.resultMessage).not.toBeDisplayed()
  })

  it('should display the correct win/loss message based on the final choice', async () => {
    await mainPage.door(0).click()
    await mainPage.switchButton.click()

    const resultMessage = await mainPage.resultMessage.getText()
    const isWin = resultMessage.includes('You win!')
    const isLose = resultMessage.includes('You lose!')

    await expect(isWin || isLose).toBe(true)
  })

  it('should update the global statistics after each game', async () => {
    browser.setupInterceptor()
    browser.expectRequest('PATCH', 'https://oxabqxkmskkbphglpwlt.supabase.co/rest/v1/statistics?id=eq.global', 204)

    await mainPage.toggleGlobalStatsButton.click()
    await mainPage.gamesPlayed.scrollIntoView()
    await expect(mainPage.gamesPlayed).toBeDisplayedInViewport()

    await waitForTextChange(mainPage.gamesPlayed, '0')

    const initialGamesPlayed = Number.parseInt(await mainPage.gamesPlayed.getText(), 10)

    await mainPage.door(0).click()
    await mainPage.switchButton.click()

    await waitForTextChange(mainPage.gamesPlayed, `${initialGamesPlayed}`, `${initialGamesPlayed + 1}`)

    const updatedGamesPlayed = Number.parseInt(await mainPage.gamesPlayed.getText(), 10)
    await expect(updatedGamesPlayed).toBe(initialGamesPlayed + 1)

    browser.assertRequests()
  })
})
