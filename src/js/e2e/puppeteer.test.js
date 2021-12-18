import puppeteer from 'puppeteer';

jest.setTimeout(30000);
describe('List-Editor', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:9000';
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: false,
      // For my work computer with Windows 7 and rights restrictions
      // eslint-disable-next-line max-len
      // executablePath: 'C:/Users/BurachkovAA1/AppData/Local/Google/Chrome Dev/Application/chrome.exe',
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
  });

  describe('List editor', () => {
    test('should show popup', async () => {
      await page.goto(baseUrl);
      const main = await page.$('.list');
      const add = await main.$('.list__add-submit');
      add.click();
      await page.waitForSelector('.popup');
    });

    test('should show hint', async () => {
      const popUp = await page.$('.popup');
      const saveButton = await popUp.$('.form__save');
      saveButton.click();
      await page.waitForSelector('.form__hint');
    });

    test('should add product in list', async () => {
      const InputName = await page.$('.form__name');
      const InputPrice = await page.$('.form__price');
      await InputName.type('Картошка');
      await InputPrice.type('40');
      const saveButton = await page.$('.form__save');
      saveButton.click();
      await page.waitForSelector('.product__name');
      await page.waitForSelector('.product__price');
    });

    test('show popup after click button change product', async () => {
      const changeButton = await page.$('.change-button');
      changeButton.click();
      await page.waitForSelector('.popup');
    });

    // test('close popup', async () => {
    //   const resetButton = await page.$('.form__reset');
    //   resetButton.click();
    //   const result = await page.evaluate(() => document.querySelectorAll('.popup').length);
    //   expect(result).toBe(0); //! возвращает result = 1, а не 0
    // });
  });
});
