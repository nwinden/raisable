clientApp.controller('LandingController', ['$scope', '$location', '$http', '$mdDialog', 'Upload', function($scope, $location, $http, $mdDialog, Upload) {

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
    $mdDialog.show({
      controller: function LandingController($scope, $mdDialog, Upload) {
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

  // upload later on form submit or something similar
  $scope.submit = function() {

    if ($scope.file) {
      $scope.upload($scope.file);
      console.log('i did something:', $scope.file);
    }
    closeDialog();
  };

  // upload on file select or drop
  $scope.upload = function (file) {

    console.log(file);

    Upload.upload({
      url: '/upload',
      data: {file: file}
    }).then(function (resp) {

      //after image upload, new sponsor is created, image included in object, and PUT into database
      var newSponsor = new Sponsor($scope.donationAmount, $scope.clientCard, $scope.sponsor);
      newSponsor.imageLink = 'https://raisable.s3.amazonaws.com/' + resp.data
      newSponsor.acceptedReward = true;
      newSponsor.rewardAccepted = $scope.campaign.donorLevels[0].name;

      var id = $scope.campaign._id;
      $http.put('/campaigns/' + id, newSponsor)
        .then(function (response) {
          console.log('PUT /new sponsor after successful payment collected ', newSponsor);
          console.log('Successful PUT object:', response);
          getCampaign();
        });

      console.log(resp);
    }, function (resp) {
      console.log('Error status: ' + resp.status);
    }, function (evt) {
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    });

  };

  $scope.charge = function(clientCard, date, sponsor) {

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
        chargeToken.emial = sponsor.email

        $http.post('/pay', chargeToken)
          .then(function(response) {

            alert('Your Charge has been processed. Please have a wonderful day.');

            //after successful charge to donor, check donaton amount against LOW value of tier (usually sponsor tier)
            //to determine if condition is met to call addImage function
            if ($scope.donationAmount * 100 >= $scope.campaign.donorLevels[0].low) {
              addImage();
            } else {

              //new donor info is PUT to db without calling addImage. constructor used to create new donor/sponsor
              var newSponsor = new Sponsor($scope.donationAmount, $scope.clientCard, $scope.sponsor);

              var id = $scope.campaign._id;
              $http.put('/campaigns/' + id, newSponsor)
                .then(function (response) {
                  console.log('PUT /new sponsor after successful payment collected ', newSponsor);
                  console.log('Successful PUT object:', response);
                  getCampaign();
                });

            }

            closeDialog(); //close reward-dailog






        }, function(response) {

          alert('Your Charge did not go through, please try again or contact your Credit Card Provider for assistance.');

        });

    } // closes else statement
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


  //sponsor constructor
  function Sponsor (donationAmount, clientCard, sponsor) {

    this.firstName = sponsor.firstName;
    this.lastName = sponsor.lastName;
    this.email = sponsor.email;
    this.zipCode = clientCard.address_zip;
    this.imageApproved = false;
    this.imageLink = '';
    this.websiteLink = '';
    this.promotorLinkUsed = '';
    this.donation = donationAmount * 100;

    //emailThankYou
    if (sponsor.email) {
      this.emailThankYou = true;
    } else {
      this.emailThankYou = false;
    }

    //publicThankYou
    if (angular.element(document.querySelector('.thankYou')).hasClass('md-checked')) {
      this.publicThankYou = true;
    } else {
      this.publicThankYou = false;
    }

    //rewardAccepted (string - name of reward)
    for (var i = 0; i < $scope.campaign.donorLevels.length; i++) {
      if (angular.element(document.querySelector('.tier-' + [i])).hasClass('md-checked')) {
        this.rewardAccepted = $scope.campaign.donorLevels[i].name;

        //acceptedReward (boolean)
        if (i == $scope.campaign.donorLevels.length - 1) {
          this.acceptedReward = false;
        } else {
          this.acceptedReward = true;

        }
      }
    }


  }

}]);
