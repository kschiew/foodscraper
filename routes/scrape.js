const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const request = require('request');

const url = 'https://deliveroo.com.sg/cuisines/chinese-takeaway/singapore';
const deliveroo_url = "https://deliveroo.com.sg/";

const featured_restaurants = new Set();

const scrapeRestaurants = () => {
    request(deliveroo_url, (error, response, html) => {
            const $ = cheerio.load(html);
            htmlFile = $('h3[class^="HomepageFeaturedRestaurantTile"]')
                .contents()
                .each((i, elem) => {
                    featured_restaurants.add(elem['data']);
                });
    });
};

router.get('/', (req, res, next) => {
    scrapeRestaurants();
    res.send([...featured_restaurants]);
});

module.exports = router;
