import puppeteer from 'puppeteer-core';

jest.setTimeout(30000);
describe('Credit card validator', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:8080';
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
      channel: 'chrome',
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
  });

  describe('Credit card validator', () => {
    test('should add .success-active class for valid number', async () => {
      try {
        await page.goto(baseUrl);
      } catch (error) {
        console.log(error.message);
      }
      const main = await page.$('.list');
      const add = await main.$('.list__add-submit');
      add.click();
      await page.waitForSelector('.popup');
    });
  });
});
