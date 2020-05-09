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
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);

    await page.goto(deliverooUrl);

    page.focus('input[id="location-search"]');
    page.keyboard.type(postalCode);
    page.evaluate((postalCode) => {
       document.querySelector('button[tabindex="0"]').value = postalCode;
    }, postalCode);
    await page.click('button[tabindex="0"]');

    console.log(page.url());
    await page.waitForNavigation();
    console.log(page.url());


    request(page.url(), (error, response, html) => {
        const featuredRestaurants = [];
        const $ = cheerio.load(html);
        restaurantCards = $('div[class="HomeFeedUICard-9e4c25acad3130ed"].a')
            .each((i, elem) => {
                //featured_restaurants.add(new Restaurant(elem['data']));
                console.log(elem);
            });
    });
};

