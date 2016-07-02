clientApp.controller('LandingController', ['$scope','$location', '$http', '$mdDialog', 'campaignFactory', function($scope, $location, $http, $mdDialog, campaignFactory) {

  var campaign = {
    "url": "raisable.com/slp-booster-club/ad98398dad",
    "shortUrl": "raisable.com/CekJ3Cd",
    "featured": true,
    "title": "New Uniforms for the Spartans",
    "creatorName": "Spring Lake Park Football Booster Club",
    "creatorId": "507f191e810c19729de860ea",
    "campaignId": 1234,
    "zipCode": 55432,
    "categories": [
      "sports",
      "high school",
      "football"
    ],
    "imageLink": "http://student-fundraising-mockup.s3-website-us-west-2.amazonaws.com/team.jpg",
    "videoLink": "http://student-fundraising-mockup.s3-website-us-west-2.amazonaws.com/team.mp4",
    "about": "Help the Spartans raise money for senior uniforms. Each year the Spartan football team aims to provide all seniors with new uniforms that they can take with them to commemorate their time with the team",

    "items": [{
      "name": "Jersey",
      "price": 8000,
      "quantity": 34
    },
    {
      "name": "Helmet",
      "price": 7000,
      "quantity": 34
    }],

    "goal": 510000,
    "raised": 231200,
    "donorCount": 12,
    "launchDate": "2016-06-21T16:00:00Z",
    "deadlineDate": "2016-07-21T16:00:00Z",

    "faqs": [{
      "question": "When will the seniors recieve their uniforms?",
      "email": "curiousbacker1@gmail.com",
      "approved": true,
      "response": "If we reach our goal, we can have our uniforms delievered to the students in about 2 weeks."
    },
    {
      "question": "When will the seniors recieve their uniforms?",
      "email": "curiousbacker2@gmail.com",
      "approved": true,
      "response": "If we reach our goal, we can have our uniforms delievered to the students in about 2 weeks."
    }],

    "promoters": [{
      "name": "Andy M.",
      "refferalUrl": "andym",
      "clicks": [{
        "time": "2016-05-18T16:00:00Z",
        "ipAddress": "134.29.208.43",
        "donation": true
      }],
      "backerCount": 4,
      "donationAmmount": 3000
      },
      {
      "name": "Billy",
      "refferalUrl": "billy",
      "clicks": [{
        "time": "2016-05-18T16:00:00Z",
        "ipAddress": "134.29.208.43",
        "donation": true
      }],
      "backerCount": 4,
      "donationAmmount": 3000
      },
      {
      "name": "Jeb",
      "refferalUrl": "jeb",
      "clicks": [{
        "time": "2016-05-18T16:00:00Z",
        "ipAddress": "134.29.208.43",
        "donation": true
      }],
      "backerCount": 4,
      "donationAmmount": 3000
    }],

    "donorLevels": [{
      "name": "Sponsor",
      "low": 50000,
      "high": 1000000,
      "hasReward": true,
      "rewardTitle": "Sponsor Package",
      "rewardDescription": "Image and link on campaign landing page. Loudspeaker thank you at each home football game.",
      "rewardImageLink": "http://student-fundraising-mockup.s3-website-us-west-2.amazonaws.com/logo.jpg",
      "sponsors": [
        {
          "donation": 50000,
          "publicThankYou": true,
          "emailThankYou": true,
          "acceptedReward": true,
          "rewardAccepted": "Sponser Reward",
          "firstName": "Dunn Bros Coffee",
          "lastName": "",
          "zipCode": 55432,
          "email": "bob@dunnbrothers.com",
          "imageLink": "https://genesistransformation.files.wordpress.com/2014/11/coffee.jpg",
          "websiteLink": "dunnbrothers.com/promotion/3029fjd3",
          "promotorLinkUsed":"none"
        },
        {
          "donation": 50000,
          "publicThankYou": true,
          "emailThankYou": true,
          "acceptedReward": true,
          "rewardAccepted": "Sponser Reward",
          "firstName": "Dunn Bros Coffee",
          "lastName": "",
          "zipCode": 55432,
          "email": "bob@dunnbrothers.com",
          "imageLink": "https://genesistransformation.files.wordpress.com/2014/11/coffee.jpg",
          "websiteLink": "dunnbrothers.com/promotion/3029fjd3",
          "promotorLinkUsed":"none"
        }
      ]
    },
    {
      "name": "All-Star",
      "low": 20000,
      "high": 49999,
      "hasReward": true,
      "rewardTitle": "Be PM",
      "rewardDescription": "We will make you the new prime minister of England.",
      "rewardImageLink": "",
      "sponsors": [

      ]
    },
    {
      "name": "Gold",
      "low": 10000,
      "high": 19999,
      "hasReward": true,
      "rewardTitle": "Season Tickets",
      "rewardDescription": "Two regular season tickets.",
      "rewardImageLink": "",
      "sponsors": [

      ]
    },
    {
      "name": "Silver",
      "low": 5000,
      "high": 9999,
      "hasReward": true,
      "rewardTitle": "Tickets to the homecoming game",
      "rewardDescription": "Two tickets to the season opener.",
      "rewardImageLink": "",
      "sponsors": [

      ]
    },
    {
      "name": "Team",
      "low": 1000,
      "high": 4999,
      "hasReward": true,
      "rewardTitle": "Snack Voucher",
      "rewardDescription": "Get a voucher for a free snack at the next game.",
      "rewardImageLink": "",
      "sponsors": [
        {
          "donation": 2000,
          "publicThankYou": true,
          "emailThankYou": true,
          "acceptedReward": true,
          "rewardAccepted": "Team Reward",
          "firstName": "Mo",
          "lastName": "Ford",
          "zipCode": 55112,
          "email": "mmmmmM@gmail.com",
          "imageLink": "",
          "websiteLink": "",
          "promotorLinkUsed":"jeb"
        }
      ]
    },
    {
      "name": "Donor",
      "low": 100,
      "high": 100000,
      "hasReward": false,
      "rewardTitle": "",
      "rewardDescription": "",
      "rewardImageLink": "",
      "sponsors": [
        {
          "donation": 10000,
          "publicThankYou": false,
          "emailThankYou": false,
          "acceptedReward": false,
          "rewardAccepted": "No Reward",
          "firstName": "",
          "lastName": "",
          "zipCode": 55005,
          "email": "abbieh@gmail.com",
          "imageLink": "",
          "websiteLink": "",
          "promotorLinkUsed":"andym"
        }
      ]
    }],

    "twitterImageLink": "http://student-fundraising-mockup.s3-website-us-west-2.amazonaws.com/team.jpg",
    "twitterShareText": "help the slp spartans get new uniforms raisable.com/lksdfj3c",
    "facebookPostTitle": "help the slp spartans get new uniforms raisable.com/lksdfj3c",
    "facebookImageLink": "http://student-fundraising-mockup.s3-website-us-west-2.amazonaws.com/team.jpg",
    "facebookPostContent": "help the slp spartans get new uniforms raisable.com/lksdfj3c",
    "instagramImageLink": "http://student-fundraising-mockup.s3-website-us-west-2.amazonaws.com/team.jpg",
    "instagramShareText": "help the slp spartans get new uniforms raisable.com/lksdfj3c",
    "pinterestImageLink": "http://student-fundraising-mockup.s3-website-us-west-2.amazonaws.com/team.jpg",
    "pinterestShareText": "help the slp spartans get new uniforms raisable.com/lksdfj3c",
  }


var bar = new ProgressBar.Line(progressLine, {
  strokeWidth: 4,
  easing: 'easeInOut',
  duration: 1400,
  color: '#3F51B5',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: {width: '100%', height: '100%'}
});

$scope.selectedReward = {};
$scope.donationAmount = 0;
$scope.accountFees = 0;
$scope.totalContribution = 0;
$scope.campaign = campaign;
$scope.needs = [];
$scope.faqs = [];
$scope.donorTiers = [];
$scope.title = campaign.title;
$scope.name = campaign.creatorName;
$scope.levels = campaign.donorLevels;
var claimedReward = 0;

Stripe.setPublishableKey('pk_test_sxs4BWKkRUf9HMXnALXxadxG');

$scope.chargeToken = {};


//gramaticly correct backer message
if (campaign.donorCount == 1) {
  $scope.backers = campaign.donorCount + ' backer';
} else {
  $scope.backers = campaign.donorCount + ' backers';
}

//runs once on page load
changeProgressBar();
timeRemaining();

function timeRemaining() {
  var deadline = moment(campaign.deadlineDate);
  var now = moment();
  $scope.timeRemaining = moment(deadline - now).format('D');
  if ($scope.timeRemaining <= 0) {
    $scope.timeRemaining = 0 + ' days left';
  } else if ($scope.timeRemaining == 1) {
    $scope.timeRemaining = 1 + ' day left!';
  } else {
    $scope.timeRemaining += ' days left';
  }
}

function changeProgressBar() {
  var progress = (campaign.raised / campaign.goal);
  bar.animate(progress);
  $scope.goal = campaign.goal;
  $scope.raised = campaign.raised;
}

$scope.calcFees = function (donation) {
  $scope.accountFees = (30 + (0.029 * donation));
  $scope.totalContribution = donation - $scope.accountFees;
}

$scope.calcFees2 = function (donation) {
  donation *= 100;
  $scope.checkAvailability(donation);
  $scope.accountFees = (30 + (0.029 * donation));
  $scope.totalContribution = donation - $scope.accountFees;
}

var params = $location.search('link');
console.log('params:', params);
if (params.$$search.link == true) { //$$ is correct
  console.log('location search found true!');
} else {
  console.log('location search found false, but at least it checked');
}


angular.forEach($scope.campaign.items, function (need) {
  $scope.needs.push(need);
});

angular.forEach($scope.campaign.faqs, function (faq) {
  $scope.faqs.push(faq);
});

angular.forEach($scope.campaign.donorLevels, function (tiers) {
  $scope.donorTiers.push(tiers);
});

//--- Landing Page Carousel --- //

$scope.dataArray = [{
    src: 'http://www.calgarywindowsales.ca/img/Calgary-1440x400--3.jpg'
}, {
    src: 'https://wordpress.nessyamato.com/wp-content/uploads/2015/10/hp1440x400-menar-bluegreen.jpg'
}, {

    src: 'http://www.anglinpr.com/files/7814/4356/6575/web-header-OCAST-1440-x-400.png'
}];



//function for generating reward dialog box
$scope.claimReward = function (tier) {

  //prepopulates donation filed based on reward selected
  if (tier == 0) {
    $scope.donationAmount = 0;
    $scope.calcFees(0);
  } else {
    $scope.donationAmount = tier.low / 100;
    $scope.calcFees(tier.low);
  }

  $mdDialog.show({
    controller: function LandingController($scope, $mdDialog) {
      $scope.closeDialog = function () {
        $mdDialog.hide();
      }
    },
    clickOutsideToClose: true,
    scope: $scope,
    preserveScope: true,
    templateUrl: 'reward-dialog2.html',
    onComplete: afterShowAnimation
  });
  function afterShowAnimation(scope, element, options) {
    console.log('popup done');
    $scope.checkAvailability(tier.low);

  }
};

$scope.charge = function (clientCard, date) {

  var token;

  if ((date.getMonth()+1).toString().length == 1) {
    clientCard.exp_month = '0' + (date.getMonth()+1);
  } else {
    clientCard.exp_month = (date.getMonth()+1).toString();
  }

  clientCard.exp_year = date.getFullYear().toString().substring(2);

  Stripe.card.createToken(clientCard, function(status, response) {

    token = response.id;

    console.log(token);

    $scope.chargeToken.stripeToken = token;

    $http.post('/pay', $scope.chargeToken).then(function(response) {

      console.log('somthing happened');
      console.log(response);

      $scope.chargeToken = {};

    });

  });


}

/////Modal Logics/////
$scope.checkAvailability = function(donation) {
  for (var i = 0; i < campaign.donorLevels.length - 1; i++) {
    angular.element(document.querySelector('.tier-' + [i])).removeClass('unavailable');
    if (donation >= campaign.donorLevels[i].low) {
      console.log(campaign.donorLevels[i].name + ' is available');
    } else {
      console.log(campaign.donorLevels[i].name + ' is not available');
      console.log(angular.element(document.querySelector('.tier-' + [i])));
      angular.element(document.querySelector('.tier-' + [i])).addClass('unavailable');
    }
  }
}

}]);
