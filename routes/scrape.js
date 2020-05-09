const express = require('express');
const router = express.Router();

const scrapeController = require('../controllers/scrapeController');

router.post('/postFeatured', scrapeController.postFeatured);
router.get('/getFeatured', scrapeController.getFeatured);
//router.post('/byCuisine', scrapeController.postByCuisine);
//router.post('/byFoodName', scrapeController.postByFoodName);

module.exports = router;
