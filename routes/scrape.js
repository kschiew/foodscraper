const express = require('express');
const router = express.Router();

const scrapeController = require('../controllers/scrapeController');

router.post('/featured', scrapeController.postFoodPandaFeatured);
router.post('/search', scrapeController.postSearch);
//router.get('/', scrapeController.getFoodPandaFeatured);
//router.post('/byCuisine', scrapeController.postByCuisine);
//router.post('/byFoodName', scrapeController.postByFoodName);

module.exports = router;
