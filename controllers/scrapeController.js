const featured_restaurants = new Set();
const Restaurant = require('../models/Restaurant');
const request = require('request');

exports.getFeatured = async (req, res, body) => {
    const postalCode = req.body.postalCode;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goTo('https://deliveroo.com.sg');
    await page.focus('#location-search');
    page.keyboard.type(postalCode);
    await page.keyboard.press('Enter');
    await page.waitForNavigation();


    request(page.url(), (error, response, html) => {
        const featuredRestaurants = [];
        const $ = cheerio.load(html);
        restaurantCards = $('div[class="HomeFeedUICard-9e4c25acad3130ed".a]')
            .map((elem) => {
                //featured_restaurants.add(new Restaurant(elem['data']));
                return elem.attribs('href');
            })
            .forEach(elem => console.log(elem));
    });

};

