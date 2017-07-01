import { browser, by, element } from 'protractor';

export class NgTrainingAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('mc-root h1')).getText();
  }
}
