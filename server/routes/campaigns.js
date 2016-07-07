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

router.get('/:campaignId', function (req, res) {
  Campaign.find({campaignId: req.params.campaignId}, function (err, campaign) {

    if (err) {
      res.sendStatus(500);
      return;
    }
    console.log(req.params.campaignId);
    console.log("Made it this far!");
    res.send(campaign);
  });
});

module.exports = router;
