var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CampaignSchema = new Schema({
  url: { type: String, required: true },
  shortUrl: { type: String, required: false },
  featured: { type: Boolean, required: true, default: false },
  title: { type: String, required: true },
  creatorName: { type: String, required: true },
  creatorId: { type: String, required: true },
  campaignId: {type: Number, required: true},
  zipCode: { type: Number, required: true },
  categories: [String],
  imageLink: { type: String, required: true },
  videoLink: { type: String, required: true },
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
  donorLevels: [{
    name: { type: String, required: true },
    low: { type: Number, required: true },
    high: { type: Number, required: true },
    hasReward: { type: Boolean, required: true },
    rewardTitle: { type: String, required: false },
    rewardDescription: { type: String, required: false },
    rewardImageLink: { type: String, required: false },
    sponsors: [{
      donation: { type: Number, required: true },
      publicThankYou: { type: Boolean, required: true },
      emailThankYou: { type: Boolean, required: true },
      acceptedReward: { type: Boolean, required: true },
      rewardName: { type: String, required: true },
      firstName: { type: String, required: false },
      lastName: { type: String, required: false },
      zipCode: { type: Number, required: true },
      email: { type: String, required: true },
      imageLink: { type: String, required: false },
      websiteLink: { type: String, required: false },
      promotorLinkUsed: { type: String, required: true, default: "none" }
    }],
  }],
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
