import { expect } from '@wdio/globals';
import MainPage from '../pageobjects/main.page';

describe('Monty Hall application', () => {
    beforeEach(async () => {
        await MainPage.open();
    });

    it('should allow the user to select a door and stick with the choice', async () => {
        await MainPage.door(0).click();
        await MainPage.stickButton.click();

        await expect(MainPage.resultMessage).toBeExisting();
    });

    it('should allow the user to select a door and switch the choice', async () => {
        await MainPage.door(1).click();
        await MainPage.switchButton.click();

        await expect(MainPage.resultMessage).toBeExisting();
    });

    it('should allow the user to play again after a game', async () => {
        await MainPage.door(2).click();
        await MainPage.stickButton.click();

        await expect(MainPage.resultMessage).toBeExisting();

        await MainPage.playAgainButton.click();

        await expect(MainPage.door(0)).toBeExisting();
    });
});
