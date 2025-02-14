import { browser } from '@wdio/globals'

export class Page {
  public open(path?: string) {
    return browser.url(`/${path}`)
  }
}
