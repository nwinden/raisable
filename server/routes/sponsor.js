var express = require('express');
var router = express.Router();
var Campaign = require('../models/campaign');
var Donor = require('../models/donortierschema');


router.put('/:id', function (req, res) {
  var id = req.params.id;
  var newSponsor = req.body;
  console.log(newSponsor);
  Campaign.findById(id, function (err, campaign) {
    console.log('FOUND CORRECT', campaign);
    if (err) {
      res.json({message: "cannot find correct campaign"});
      return;
    }
    //adjust campaign raised amount by adding new sponsor amount to total
    campaign.raised += newSponsor.donation;

    //adjust the donor count
    campaign.donorCount += 1;
    var donorTiers = campaign.donorLevels;
    var donation = newSponsor.donation;

    donorTiers.forEach(function (tier, index) {

      if (donation >= tier.low && donation <= tier.high) {
        campaign.donorLevels[index].sponsors.push(newSponsor);
      }
    });
    campaign.save(function (err) {
      if (err) {
        console.log('err', err);
        res.send(err);
        return;
      }
      res.sendStatus(204);
    });

  });
});


module.exports = router;
