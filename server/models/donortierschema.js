var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SponsorSchema = require('./sponsorschema').schema;

var DonorTierSchema = new Schema({
  name: { type: String, required: true },
  low: { type: Number, required: true },
  high: { type: Number, required: true },
  hasReward: { type: Boolean, required: true },
  rewardTitle: { type: String, required: false },
  rewardDescription: { type: String, required: false },
  rewardImageLink: { type: String, required: false },
  sponsors: [SponsorSchema],
});

var DonorTier = mongoose.model('Donor', DonorTierSchema);

module.exports = DonorTier;
