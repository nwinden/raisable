var express = require('express');
var router = express.Router();

//used for charging for stripe, the second param is the test or secret key
//heroku should have env settings in place to not have this on the .js file
// See your keys here https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")("sk_test_s4USBx9JT860nBtDCDKmkwuZ");

router.post('/', function (req, res) {

  // Get the credit card details submitted by the form
  var stripeToken = req.body.stripeToken;
  var donation = req.body.donation;
  var email = req.body.email;

  //charge object for the test stripe account
  var charge = stripe.charges.create({
    amount: donation, // amount in cents, again
    currency: "usd",
    source: stripeToken,
    receipt_email: email,
    description: "Example charge"
  }, function(err, charge) {

    //error handling for if the stripe transation fails, see stripe.com for the error list.
    if (err && err.type === 'StripeCardError') {
      res.sendStatus(502);
    } else if (err) {
      res.sendStatus(502);
    } else {
      res.sendStatus(200);
    }

  });



  //this is a way to do the connected stripe accounts when you have it set up
  //NOTE: we do not have a function set up for finding the application_fee as we were not sure what was the ending amount you wanted

  // var charge = stripe.charges.create({
  //   amount: donation, // amount in cents, again
  //   currency: "usd",
  //   source: stripeToken,
  //   receipt_email: email,
  //   application_fee: PUT_APP_FEE_VAR_HERE, // amount in cents
  //   destination: {CONNECTED_STRIPE_ACCOUNT_ID}
  // }, function(err, charge) {
  //
  //   //error handling for if the stripe transation fails, see stripe.com for the error list.
  //   if (err && err.type === 'StripeCardError') {
  //     res.sendStatus(502);
  //   } else if (err) {
  //     res.sendStatus(502);
  //   } else {
  //     res.sendStatus(200);
  //   }
  //
  // });

});

module.exports = router;
