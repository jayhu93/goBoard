import { GoBoardPage } from './app.po';

describe('go-board App', function() {
  let page: GoBoardPage;

  beforeEach(() => {
    page = new GoBoardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
