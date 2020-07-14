const model = require('../models/model.js');

// INSERT/ADD PRODUCT
const addProduct = (req, res) => {
  model.addProduct(req.query.productID, (err, results) => {
    if (err) {
      res.status(500).send({ mes: err });
    } else {
      res.status(200).json({
        results,
      });
    }
  });
};

// GET ALL PRODUCTS
const getProducts = (req, res) => {
  model.getProducts((err, results) => {
    if (err) {
      res.status(500).send({ mes: err });
    } else {
      res.status(200).json({
        results,
      });
    }
  });
};

// GET SINGLE PRODUCT
const getProduct = (req, res) => {
  console.log(req.query.productID);
  model.getProduct(req.query.productID, (err, results) => {
    if (err) {
      res.status(500).send({ mes: err });
    } else {
      res.status(200).json({
        results,
      });
    }
  });
};

// GET SINGLE PRODUCT STYLE
const getProductStyle = (req, res) => {
  model.getProductStyle(req.query.productID, (err, results) => {
    if (err) {
      res.status(500).send({ mes: err });
    } else {
      res.status(200).json({
        results,
      });
    }
  });
};

// GET SINGLE PRODUCT STYLE PHOTOS
const getProductPhotos = (req, res) => {
  model.getProductPhotos(req.query.productID, (err, results) => {
    if (err) {
      res.status(500).send({ mes: err });
    } else {
      res.status(200).json({
        results,
      });
    }
  });
};

// GET SINGLE PRODUCT STYLE PHOTOS
const getProductSkus = (req, res) => {
  model.getProductSkus(req.query.productID, (err, results) => {
    if (err) {
      res.status(500).send({ mes: err });
    } else {
      res.status(200).json({
        results,
      });
    }
  });
};

// UPDATE PRODUCT
const editProduct = (req, res) => {
  model.editProduct(req.query.productID, (err, results) => {
    if (err) {
      res.status(500).send({ mes: err });
    } else {
      res.status(200).json({
        results,
      });
    }
  });
};

// DELETE/REMOVE PRODUCT
const removeProduct = (req, res) => {
  model.removeProduct(req.query.productID, (err, results) => {
    if (err) {
      res.status(500).send({ mes: err });
    } else {
      res.status(200).json({
        results,
      });
    }
  });
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  getProductStyle,
  getProductPhotos,
  getProductSkus,
  editProduct,
  removeProduct,
};
