var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DonorTierSchema = require('./donortierschema').schema;
var SponsorSchema = require('./sponsorschema').schema;


var CampaignSchema = new Schema({
  url: { type: String, required: true },
  shortUrl: { type: String, required: false },
  featured: { type: Boolean, required: true, default: false },
  title: { type: String, required: true },
  creatorName: { type: String, required: true },
  creatorId: { type: String, required: true },
  campaignId: { type: Number, required: true},
  zipCode: { type: Number, required: true },
  categories: [String],
  imageLink: { type: String, required: false },
  tileImageLink: { type: String, required: false },
  videoLink: { type: String, required: false },
  about: { type: String, required: true },
  items: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  }],
  goal: { type: Number, required: true },
  raised: { type: Number, required: true },
  donorCount: { type: Number, required: true },
  launchDate: { type: Date, required: true, default: Date.now},
  deadlineDate: { type: Date, required: true },
  faqs: [{
    question: { type: String, required: true },
    email: { type: String, required: true },
    approved: { type: Boolean, required: true, default: false },
    response: { type: String, required: false }
  }],
  promoters: [{
    name: { type: String, required: true },
    refferalUrl: { type: String, required: true },
    clicks: [{
      time: { type: Date, required: false },
      ipAddress: { type: String, required: false},
      donation: { type: Boolean, required: false, default: false}
    }],
    backerCount: { type: Number, required: true, default: 0 },
    donationAmmount: { type: Number, required: true, default: 0 }
  }],
  donorLevels: [DonorTierSchema],
  twitterImageLink: { type: String, required: true },
  twitterShareText: { type: String, required: true },
  facebookPostTitle: { type: String, required: true },
  facebookImageLink: { type: String, required: true },
  facebookPostContent: { type: String, required: true },
  instagramImageLink: { type: String, required: true },
  instagramShareText: { type: String, required: true }
});

var Campaign = mongoose.model('Campaign', CampaignSchema);

module.exports = Campaign;
