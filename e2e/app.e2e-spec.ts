import { NgTrainingAppPage } from './app.po';

describe('ng-training-app App', () => {
  let page: NgTrainingAppPage;

  beforeEach(() => {
    page = new NgTrainingAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to mc!!');
  });
});
