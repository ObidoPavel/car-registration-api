const express = require('express');
const router = express.Router();
const carRegistration = require('../services/carRegistration');

/* GET a list of all makes */
router.get('/makes', async function(req, res, next) {
  try {
    res.json(await carRegistration.getAllMakes());
  } catch (err) {
    console.error(`Error while getting a list of all car makes `, err.message);
    next(err);
  }
});

/* GET a list of all models given a make and year */
router.get('/models', async function(req, res, next) {
    try {
      res.json(await carRegistration.getAllModels(req.query.make, req.query.year));
    } catch (err) {
      console.error(`Error while getting a list of all car models `, err.message);
      next(err);
    }
  });

/* GET an info given VIN */
router.get('/info', async function(req, res, next) {
    try {
      res.json(await carRegistration.getInfoByVin(req.query.vin));
    } catch (err) {
      console.error(`Error while getting car info by VIN `, err.message);
      next(err);
    }
  });

module.exports = router;