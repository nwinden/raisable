var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var aws = require('aws-sdk');
var multerS3 = require('multer-s3')

var s3 = new aws.S3();

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'raisable',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, fileName = Date.now().toString());
    }
  })
})

function getS3Url(campaignId) {
  var imageKey = campaignId;
  var getUrl = s3.getSignedUrl('getObject', {
  Bucket: 'raisable',
  Key: imageKey
  });
  return getUrl;
}

router.post('/', upload.single('file'), function(req, res, next) {
  res.send(getS3Url(fileName));

  console.log(fileName);
  console.log(getS3Url(fileName));

});

module.exports = router;
