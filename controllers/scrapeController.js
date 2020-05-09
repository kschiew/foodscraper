const featured_restaurants = new Set();
const Restaurant = require('../models/Restaurant');
const request = require('request');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const deliverooUrl = 'https://deliveroo.com.sg';
const foodPandaUrl = 'https://foodpanda.sg';

exports.getDeliveroFeatured = async (req, res, body) => {
    console.log("reached getFeatured");
    const postalCode = "119618";
    console.log(postalCode);

    const browser = await puppeteer.launch({ headless : false});
    const page = await browser.newPage();

    await page.goto(deliverooUrl);

    await page.focus('input[id="location-search"]');
    await page.keyboard.type(postalCode);
    await page.keyboard.press('Enter');

    console.log(page.url());
    await page.waitForNavigation();

    await page.waitForSelector('button[aria-label="Close"]')
        .then(() => page.click('button[aria-label="Close"]'));

    console.log("after closing popup");

    const output = [];
    const cards = await page.$$('a[class^=HomeFeedUICard', elem => elem);

    for (const card of cards) {
        output.push(await page.evaluate(elem =>
                new Restaurant("Deliveroo", elem.getAttribute('aria-label'),
                    elem.find('div[style^="background-image"]'), elem))
            , card);
    }
    console.log(output);
};

exports.postFoodPandaFeatured = async (req, res, next) => {
    console.log("reached getFeatured");
    const postalCode = req.body.postalCode;

    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto(foodPandaUrl);

    await page.focus('input[id="delivery-information-postal-index"]');
    await page.keyboard.type(postalCode);
    page.evaluate(() => {
        document.querySelectorAll('button')[3].click();
    });

    await page.waitForNavigation();
    console.log(page.url());

    const output = await page.evaluate(() => {
        //const tile = document.querySelector('figure[class^="vendor-tile"]');
        const tiles = document.querySelectorAll('figure[class^="vendor-tile"]');
        return Array.from(tiles).map(tile => {
            return {
                company: "Food Panda",
                restaurant: tile.querySelector('span[class^="name fn"]').innerText,
                imageurl: tile.querySelector('div[class^="vendor-picture"]').getAttribute('data-src'),
                timeaway: tile.querySelector('span[class="badge-info"]').innerText
            }
        });
    });

    res.send(output);

};
