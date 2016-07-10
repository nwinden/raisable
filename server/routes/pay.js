var express = require('express');
var router = express.Router();
var stripe = require("stripe")("sk_test_s4USBx9JT860nBtDCDKmkwuZ");

router.post('/', function (req, res) {

  // Get the credit card details submitted by the form
  var stripeToken = req.body.stripeToken;
  var donation = req.body.donation

  var charge = stripe.charges.create({
    amount: donation, // amount in cents, again
    currency: "usd",
    source: stripeToken,
    receipt_email: "noah.winden@gmail.com",
    description: "Example charge"
  }, function(err, charge) {

    if (err && err.type === 'StripeCardError') {
      res.sendStatus(502);
    } else if (err) {
      res.sendStatus(502);
    } else {
      res.sendStatus(200);
    }



  });

});



module.exports = router;
