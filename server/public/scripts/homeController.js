clientApp.controller('HomeController', ['$scope', '$location', '$http', function($scope, $location, $http) {
    console.log('Home Controller!');

    $scope.expCampaign = {
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
        "low": 500,
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



    $scope.getCampaigns = function() {
        $http.get('/campaigns/all')
            .then(function(response) {
                $scope.campaigns = response.data;
                console.log($scope.campaigns);
                this.tiles = buildGridModel({
                    icon: "avatar:svg-",
                    title: "Svg-",
                    background: ""
                });

            });

    };

    //--- Home Page Campaign Search --- //
    $scope.searchInput;
    $scope.items = ["Category", "Keyword", "Zipcode"];
    $scope.selectedItem;
    $scope.getSelectedText = function() {
        if ($scope.selectedItem !== undefined) {
            return $scope.selectedItem;
        } else {
            return " Select ";
        }
    };

    $scope.campaignSearch = function() {
        alert("Sumbitted: " + $scope.searchInput + " and " + $scope.selectedItem);

    };

    //--- Home Page Carousel --- //

    $scope.dataArray = [{
        src: 'http://www.calgarywindowsales.ca/img/Calgary-1440x400--3.jpg'
    }, {
        src: 'https://wordpress.nessyamato.com/wp-content/uploads/2015/10/hp1440x400-menar-bluegreen.jpg'
    }, {

        src: 'http://www.anglinpr.com/files/7814/4356/6575/web-header-OCAST-1440-x-400.png'
    }];

    //--- Campaign Grid Tiles --- //
    // this.tiles = buildGridModel({
    //   icon : "avatar:svg-",
    //   title: "Svg-",
    //   background: ""
    // });

    function buildGridModel(tileTmpl) {
        var it, results = [];
        for (var j = 0; j < $scope.campaigns.length; j++) {
            it = angular.extend({}, tileTmpl);
            it.icon = it.icon + (j + 1);
            it.title = it.title + (j + 1);
            it.span = {
                row: 1,
                col: 1
            };
            // switch(j+1) {
            //   case 1:
            //     it.background = "red";
            //     it.span.row = it.span.col = 1;
            //     break;
            //   case 2: it.background = "green";         break;
            //   case 3: it.background = "darkBlue";      break;
            //   case 4:
            //     it.background = "blue";
            //     it.span.col = 1;
            //     break;
            //   case 5:
            //     it.background = "yellow";
            //     it.span.row = it.span.col = 1;
            //     break;
            //   case 6: it.background = "pink";          break;
            //   case 7: it.background = "darkBlue";      break;
            //   case 8: it.background = "purple";        break;
            //   case 9: it.background = "deepBlue";      break;
            //   case 10: it.background = "lightPurple";  break;
            //   case 11: it.background = "yellow";       break;
            // }
            results.push(it);
        }
        return results;
    }

    // .config( function( $mdIconProvider ){
    //   $mdIconProvider.iconSet("avatar", 'icons/avatar-icons.svg', 128);
    // });

    //--- Featured Widget --- //

    var bar = new ProgressBar.Line(progressLine, {
        strokeWidth: 8,
        easing: 'easeInOut',
        duration: 1400,
        color: '#3F51B5',
        trailColor: '#eee',
        trailWidth: 8,
        svgStyle: {
            width: '100%',
            height: '100%'
        }
    });

    changeProgressBar();
    timeRemaining();

    function timeRemaining() {
      var deadline = moment($scope.expCampaign.deadlineDate);
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
      var progress = ($scope.expCampaign.raised / $scope.expCampaign.goal);
      bar.animate(progress);
      $scope.goal = $scope.expCampaign.goal;
      $scope.raised = $scope.expCampaign.raised;
    }



}]);
