// biome-ignore lint/correctness/noUndeclaredDependencies: <explanation>
import type { ChainablePromiseElement } from 'webdriverio'
export const getByTestId = (testId: string) => `[data-testid="${testId}"]`

export const waitForTextChange = async (
  element: ChainablePromiseElement,
  initialValue: string,
  expectedValue?: string,
  timeout = 5000
) => {
  await browser.waitUntil(
    async () => {
      const text = await element.getText()
      if (expectedValue !== undefined) {
        return text === expectedValue
      }
      return text !== initialValue
    },
    {
      timeout,
      timeoutMsg: `Expected text to change to "${expectedValue}" within ${timeout}ms`
    }
  )
}
