var express = require('express');
var router = express.Router();
var Campaign = require('../models/campaign');

//returns all the campaigns in the DB
router.get('/', function (req, res) {
  Campaign.find({}, function (err, campaigns) {

    if (err) {
      res.sendStatus(500);
      return;
    }

    res.send(campaigns);
  });
});

router.get('/all', function (req, res) {
  Campaign.find({}, function (err, campaigns) {

    if (err) {
      res.sendStatus(500);
      return;
    }

    res.send(campaigns);
  });
});

router.get('/:id', function (req, res) {
  var id = req.params.id;
  Campaign.find({campaignId: id}, function (err, campaigns) {

    if (err) {
      res.sendStatus(500);
      return;
    }

    res.send(campaigns);
  });
});

module.exports = router;
