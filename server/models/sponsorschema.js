var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SponsorSchema = new Schema({
  donation: { type: Number, required: true },
  publicThankYou: { type: Boolean, required: false },
  emailThankYou: { type: Boolean, required: true },
  acceptedReward: { type: Boolean, required: true },
  rewardAccepted: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  zipCode: { type: Number, required: true },
  email: { type: String, required: true },
  imageApproved: { type: Boolean, required: true, default: false},
  imageLink: { type: String, required: false },
  websiteLink: { type: String, required: false },
  promotorLinkUsed: { type: String, required: false, default: "none" }
});

var Sponsor = mongoose.model('Sponsor', SponsorSchema);

module.exports = Sponsor;
