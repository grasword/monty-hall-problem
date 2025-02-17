import { browser } from '@wdio/globals'

export class Page {
  public open(path = '/') {
    return browser.url(`${path}`)
  }
}
