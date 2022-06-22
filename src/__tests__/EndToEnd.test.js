import puppeteer from 'puppeteer';

// ------- First scope, 1st app feature
describe('filter events by city', () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch();
    // ({
    //   headless: false,
    //   slowMo: 250,
    //   ignoreDefaultArgs: ['-disable-extensions'],
    // });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
  });

  afterAll(() => {
    browser.close();
  });

  test('When a user hasnt searched for a city, show upcoming events from all cities', async () => {
    await page.waitForSelector('.EventList');
    const eventCount = (await page.$$('.event')).length;
    expect(eventCount).toBe(2);
  });

  test('A user should see a list of suggestions when they search for a city', async () => {
    await page.waitForSelector('.CitySearch');
    await page.type('.city', 'Berlin');
    const suggestionCount = (await page.$$('.suggestions li')).length;
    expect(suggestionCount).toBe(2);
  });

  test('A user can select a city from the suggested list', async () => {
    await page.reload();
    await page.waitForSelector('.CitySearch');
    await page.type('.city', 'Berlin');
    await page.click('.suggestions li');
    const eventCount = (await page.$$('.event')).length;
    expect(eventCount).toBe(1);
  });
});

// ------- Second scope, 2nd app feature
describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer
      .launch
      //   ({
      //   headless: false,
      //   slowMo: 250,
      //   ignoreDefaultArgs: ['-disable-extensions'],
      // });
      ();
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });
});
