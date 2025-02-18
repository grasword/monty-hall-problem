export const testIds = {
  app: {
    container: 'app-container',
    title: 'app-title',
    subtitle: 'app-subtitle',
    resultMessage: 'app-result-message',
    playAgainButton: 'app-play-again-button',
    stickButton: 'app-stick-button',
    switchButton: 'app-switch-button',
    toggleGlobalStats: 'app-toggle-global-stats-button'
  },
  door: (doorNumber: number) => ({
    container: `door-${doorNumber}-container`,
    label: `door-${doorNumber}-label`
  }),
  globalStats: {
    container: 'globalStats-container'
  }
}
