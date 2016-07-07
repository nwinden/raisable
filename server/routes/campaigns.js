var express = require('express');
var router = express.Router();
var Campaign = require('../models/campaign');
var path = require('path');

router.get('/all', function (req, res) {
  Campaign.find({}, function (err, campaigns) {

    if (err) {
      res.sendStatus(500);
      return;
    }
    res.send(campaigns);
  });
});

router.get('/landing/:id', function (req,res) {
  var id = req.params.id;
  Campaign.find({campaignId: id}, function (err, campaign) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.send(campaign);
  });
});

router.get('/:id', function (req, res) {

  res.sendFile(path.join(__dirname, '../public/views/landing.html'));

  // Campaign.find({campaignId: req.params.campaignId}, function (err, campaign) {
  //
  //   if (err) {
  //     res.sendStatus(500);
  //     return;
  //   }
  //   console.log(req.params.campaignId);
  //   console.log("Made it this far!");
  //   res.send(campaign);
  // });
});

module.exports = router;
