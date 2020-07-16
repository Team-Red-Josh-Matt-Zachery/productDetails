const express = require('express');

const router = express.Router();
const controller = require('../controllers/controller.js');

// CREATE ROUTES (not used)
router.post('/add', controller.addProduct);

// GET ROUTES
router.get('/list', controller.getProducts); // get all products
router.get('/:productID', controller.getProduct); // get specific product
router.get('/:productID/styles', controller.getProductStyle); // getting style
router.get('/:productID/photos', controller.getProductPhotos); // getting style pictures
router.get('/:productID/skus', controller.getProductSkus); // getting style skus

// UPDATE ROUTES (not used)
router.post('/edit', controller.editProduct);

// DELETE ROUTES (not used)
router.post('/remove', controller.removeProduct);

module.exports = router;
