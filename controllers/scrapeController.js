const featured_restaurants = new Set();
const Restaurant = require('../models/Restaurant');
const request = require('request');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const deliverooUrl = 'https://deliveroo.com.sg';

exports.postFeatured = async (req, res, body) => {
    console.log("reached postFeatured");
    const postalCode = req.body.postalCode;
    console.log(postalCode);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(deliverooUrl);
    await page.focus('#location-search');
    page.keyboard.type(postalCode);
    await page.keyboard.press('Enter');
    await page.waitForNavigation();


    request(page.url(), (error, response, html) => {
        const featuredRestaurants = [];
        const $ = cheerio.load(html);
        restaurantCards = $('div[class="HomeFeedUICard-9e4c25acad3130ed"].a')
            .map((elem) => {
                //featured_restaurants.add(new Restaurant(elem['data']));
                console.log(elem);
                return elem.attribs('href');
            });
    });
};

exports.getFeatured = async (req, res, body) => {
    console.log("reached getFeatured");
    const postalCode = "119618";
    console.log(postalCode);

    const browser = await puppeteer.launch({ headless : false});
    const page = await browser.newPage();

    await page.goto(deliverooUrl);

    //await page.focus('input[id="location-search"]');
    await page.focus('input[id="location-search"]');
    await page.keyboard.type(postalCode);
    //await page.click('button[tabindex="0"]');
    await page.keyboard.press('Enter');

    console.log(page.url());
    await page.waitForNavigation();

    await page.waitForSelector('button[aria-label="Close"]')
        .then(() => page.click('button[aria-label="Close"]'));

    console.log("after closing popup");

    const output = [];
    const cards = await page.$$('ul > li[class^="HomeFeedUILines"] > span > p', elem => elem);
    for (const card of cards) {
        output.push(await page.evaluate(elem => elem.innerText, card));
    }
    console.log(output);
};

