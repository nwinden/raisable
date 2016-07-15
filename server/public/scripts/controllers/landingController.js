clientApp.controller('LandingController', ['$scope', '$location', '$http', '$mdDialog', function($scope, $location, $http, $mdDialog) {

  $scope.campaign = {};
  $scope.sponsor = {};

  $scope.path = location.hostname;

  getCampaign();

  function closeDialog(){
    $mdDialog.hide();
  }

  function getCampaign() {
    var whatever = location.pathname;
    for (var i = 0; i < whatever.length; i++) {
      if (whatever[i] == '/') {
        whatever = whatever.substring(i + 1);
      }
    }
    $http.get('/campaigns/landing/' + whatever).then(function(response) {
      $scope.campaign = response.data[0];
      changeProgressBar();
      timeRemaining();
      console.log('GET $scope.campaign', $scope.campaign);
    });
  }

  // goal percentage bar. called on page load and on completed payment
  var bar = new ProgressBar.Line(progressLine, {
    strokeWidth: 8,
    easing: 'easeInOut',
    duration: 2000,
    color: '#0277BD',
    trailColor: 'lightgray',
    trailWidth: 8,
    svgStyle: {
        width: '100%',
        height: '100%'
    }
  });


  $scope.donationAmount = 0;
  $scope.accountFees = 0;
  $scope.totalContribution = 0;

  Stripe.setPublishableKey('pk_test_sxs4BWKkRUf9HMXnALXxadxG');

  function timeRemaining() {
    var deadline = moment($scope.campaign.deadlineDate);
    // console.log(deadline);
    var now = moment();
    // console.log(now);
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
    if ($scope.campaign.raised < $scope.campaign.goal){
      var progress = ($scope.campaign.raised / $scope.campaign.goal);
      bar.animate(progress);
    } else {
      var progress = 1;
      bar.animate(progress);
    }
  }

  $scope.calcFees = function(donation) {
    if (donation === 0) {
      $scope.accountFees = 0;
      $scope.totalContribution = 0;
    } else {
      $scope.accountFees = (30 + (0.029 * donation));
      $scope.totalContribution = donation - $scope.accountFees;
    }
  }

  $scope.calcFees2 = function(donation) {
    if (donation === 0) {
      $scope.accountFees = 0;
      $scope.totalContribution = 0;
    } else {
      donation *= 100;
      $scope.checkAvailabilityChange(donation);
      $scope.accountFees = (30 + (0.029 * donation));
      $scope.totalContribution = donation - $scope.accountFees;
    }

  }

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
      templateUrl: '/views/reward-dialog2.html',
      onComplete: afterShowAnimation
    });
    function afterShowAnimation(scope, element, options) {
      if (tier == 0) {
        $scope.checkAvailability($scope.campaign.donorLevels[0] + 1);
      } else {
        $scope.checkAvailability(tier.low);
      }
    }
  };

  //function to generate "add image" modal. called upon successful stripe charge
  function addImage() {
    if ($scope.donationAmount * 100 >= $scope.campaign.donorLevels[0].low) {
      $mdDialog.show({
        controller: function LandingController($scope, $mdDialog) {
          $scope.closeDialog = function() {
            $mdDialog.hide();
          }
        },
        clickOutsideToClose: true,
        scope: $scope,
        preserveScope: true,
        templateUrl: "/views/image-dialog.html",
      })
    }
  }

  $scope.charge = function(clientCard, date) {

    var token;
    var chargeToken = {};

    if ((date.getMonth()+1).toString().length == 1) {
      clientCard.exp_month = '0' + (date.getMonth()+1);
    } else {
      clientCard.exp_month = (date.getMonth()+1).toString();
    }

    clientCard.exp_year = date.getFullYear().toString().substring(2);

    Stripe.card.createToken(clientCard, function(status, response) {

      token = response.id;

      if (token == undefined) {

        alert('Something went wrong, Please re-enter your Credit Card Information and Try Again.');

      } else {

        chargeToken.stripeToken = token;
        chargeToken.donation = $scope.donationAmount * 100;

        $http.post('/pay', chargeToken).then(function(response) {


          alert('Your Charge has been processed. Please have a wonderful day.');

          addImage();
          // if ($scope.donationAmount >= $campaign.donorLevels[0].low) {
          //   addImage();
          // }

          closeDialog();

          var rewards = [];
          angular.forEach($scope.campaign.donorLevels, function (reward) {
            rewards.push(reward.name);

          });
          console.log(rewards);

          //post to server increasing the donor count
          //post donor Information
          //check if they did the sponsor level to propmt a file upload

          //***************************************************************************************************************************

          var newSponsor = {
            donation: $scope.donationAmount * 100,
            // publicthankyou: in if statement below
            // emailThankYou: logic below
            // acceptedReward: logic below
            // rewardAccepted: logic below
            firstName: $scope.sponsor.firstName,
            lastName: $scope.sponsor.lastName,
            zipCode: $scope.clientCard.address_zip,
            email: $scope.sponsor.email,
            imageApproved: false,
            imageLink: '',
            websiteLink: '',
            promotorLinkUsed: ''
          };

          //emailThankYou
          if ($scope.sponsor.email) {
            newSponsor.emailThankYou = true;
          } else {
            newSponsor.emailThankYou = false;
          }

          //publicThankYou
          if (angular.element(document.querySelector('.thankYou')).hasClass('md-checked')) {
            console.log('want public thank you has class');

            newSponsor.publicThankYou = true;
          } else {
            newSponsor.publicThankYou = false;
          }

          //acceptedReward && rewardName
          for (var i = 0; i < $scope.campaign.donorLevels.length; i++) {
            if (angular.element(document.querySelector('.tier-' + [i])).hasClass('md-checked')) {
              console.log(i + ' is classy');
              newSponsor.rewardAccepted = $scope.campaign.donorLevels[i].name;
              if (i == $scope.campaign.donorLevels.length - 1) {
                newSponsor.acceptedReward = false;
              } else {
                newSponsor.acceptedReward = true;
              }
            }
          }

          var id = $scope.campaign._id;
          console.log(newSponsor);
          console.log($scope.campaign._id);
          $http.put('/campaigns/' + id, newSponsor)
            .then(function (response) {
              console.log('PUT /new sponsor after successful payment collected ', newSponsor);
              getCampaign();
            });

          //***************************************************************************************************************************

      }, function(response) {

        alert('Your Charge did not go through, please try again or contact your Credit Card Provider for assistance.');

      });

    }// closes else statement

  }); //closes stripe.car.createtoken

  } // closes payment function

  /////Modal Logics/////
  $scope.checkAvailability = function(donation) {
    //funky notation is jquery Lite built into angular
    //uses - 1 to leave comparison with 'no reward' off
    for (var i = 0; i < $scope.campaign.donorLevels.length; i++) {
      if (donation < $scope.campaign.donorLevels[i].low) {
        angular.element(document.querySelector('.tier-' + [i])).attr('disabled', true);
      }
    }
  }
  //function fires when user changes donation amount.
  $scope.checkAvailabilityChange = function(donation) {
    for (var i = 0; i < $scope.campaign.donorLevels.length; i++) {
      angular.element(document.querySelector('.tier-' + [i])).attr('disabled', false);
      if (donation < $scope.campaign.donorLevels[i].low) {
        angular.element(document.querySelector('.tier-' + [i])).attr('disabled', true);
        if (angular.element(document.querySelector('.tier-' + [i])).hasClass('md-checked')) {
          angular.element(document.querySelector('.tier-' + [i])).toggleClass('md-checked');
        }
      } else {
        angular.element(document.querySelector('.tier-' + [i])).attr('disabled', false);
      }
    }
  }
  $scope.clickCheckBox = function(tier) {
    for (var i = 0; i < $scope.campaign.donorLevels.length; i++) {
      if (angular.element(document.querySelector('.tier-' + [i])).hasClass('md-checked')) {
        angular.element(document.querySelector('.tier-' + [i])).toggleClass('md-checked');
      }
    }
  }

  $scope.toggleClass = function() {
    angular.element(document.querySelector('.thankYou')).toggleClass('md-checked');
  }

}]);
