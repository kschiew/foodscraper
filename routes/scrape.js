const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const request = require('request');

const url = 'https://deliveroo.com.sg/cuisines/chinese-takeaway/singapore';
const deliveroo_url = "https://deliveroo.com.sg/";


router.get('/featured', scrapeController.getFeaturedList);
router.post('/byCuisine', scrapeController.postByCuisine);
router.post('/byFoodName', scrapeController.postByFoodName);
