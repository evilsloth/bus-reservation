import { TransFrontPage } from './app.po';

describe('trans-front App', function() {
  let page: TransFrontPage;

  beforeEach(() => {
    page = new TransFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
