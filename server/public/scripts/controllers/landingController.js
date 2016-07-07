clientApp.controller('LandingController', ['$scope','$location', '$http', '$mdDialog', 'campaignFactory', function($scope, $location, $http, $mdDialog, campaignFactory) {

var campaign = undefined;

  var id = 1234;
  $http.get('/campaigns/' + id)
  .then(function(response) {
    campaign = response.data[0];
    console.log(campaign);


var bar = new ProgressBar.Line(progressLine, {
  strokeWidth: 4,
  easing: 'easeInOut',
  duration: 1400,
  color: '#3F51B5',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: {width: '100%', height: '100%'}
});

var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    paginationClickable: true,
    spaceBetween: 0,
    centeredSlides: true,
    autoplay: 5000,
    autoplayDisableOnInteraction: false,
    lazyLoading: true
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
  if (donation < 500) {
    $scope.accountFees = 0;
    $scope.totalContribution = 0;
  }
}

$scope.calcFees2 = function (donation) {
  donation *= 100;
  $scope.checkAvailabilityChange(donation);
  $scope.accountFees = (30 + (0.029 * donation));
  $scope.totalContribution = donation - $scope.accountFees;
  if (donation < 500) {
    $scope.accountFees = 0;
    $scope.totalContribution = 0;
  }
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


function getRadioVal(form, name) {
  var rewardAccepted;
  var radios = form.elements[name];

  for (var i = 0, len = radios.length; i < len; i++) {
    if (radios[i].checked) {
      rewardAccepted = radios[i].value;
      break;
    }
  }
  return rewardAccepted;
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
    templateUrl: 'reward-dialog2.html',
    onComplete: afterShowAnimation
  });
  function afterShowAnimation(scope, element, options) {
    if (tier == 0) {
      $scope.checkAvailability(campaign.donorLevels[0] + 1);
    } else {
      $scope.checkAvailability(tier.low);
    }
  }
};

$scope.charge = function (clientCard, date) {


  //-----TESTING REWARD VALS, MOVE TO POST CALL RETURN WHEN TESTING COMPLETE-----//

  //-----TESTING REWARD VALS-----//

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

    console.log(token);

    if (token == undefined) {

      alert('Something went wrong, Please re-enter your Credit Card Information and Try Again.');

    } else {

      chargeToken.stripeToken = token;

      $http.post('/pay', chargeToken).then(function(response) {

        alert('Your Charge has been processed. Please have a wonderful day.');

        //post to server increasing the donor count
        //post donor Information
        //check if they did the sponsor level to propmt a file upload

      }, function(response) {

        alert('Your Charge did not go through, please try again or contact your Credit Card Provider for assistance.');

      });

    }

  });

}

/////Modal Logics/////
$scope.checkAvailability = function(donation) {
  //funky notation is jquery Lite built into angular
  //uses - 1 to leave comparison with 'no reward' off
  for (var i = 0; i < campaign.donorLevels.length - 1; i++) {
    angular.element(document.querySelector('.tier-' + [i])).removeClass('md-checked');
    angular.element(document.querySelector('.tier-' + [i])).attr('disabled', false);

    if (donation == campaign.donorLevels[i].low) {
      angular.element(document.querySelector('.tier-' + [i])).addClass('md-checked');

    } else if (donation < campaign.donorLevels[i].low) {
      angular.element(document.querySelector('.tier-' + [i])).attr('disabled', true);
      angular.element(document.querySelector('.tier-' + [i])).removeClass('md-checked');
    }
  }
}

//function fires when user changes donation amount.
$scope.checkAvailabilityChange = function(donation) {
  for (var i = 0; i < campaign.donorLevels.length - 1; i++) {
    angular.element(document.querySelector('.tier-' + [i])).attr('disabled', false);
    angular.element(document.querySelector('.tier-' + [i])).removeClass('ng-touched');

    if (donation < campaign.donorLevels[i].low) {
      angular.element(document.querySelector('.tier-' + [i])).attr('disabled', true);
      angular.element(document.querySelector('.tier-' + [i])).attr('aria-checked', false);
      angular.element(document.querySelector('.tier-' + [i])).removeClass('md-checked');
    }
  }
}

$scope.clickCheckBox = function(tier) {
  for (var i = 0; i < campaign.donorLevels.length - 1; i++) {
    if (tier.name != campaign.donorLevels.name) {
      angular.element(document.querySelector('.tier-' + [i])).removeClass('md-checked');

    } else if (tier.name == campaign.donorLevels.name) {
      angular.element(document.querySelector('.tier-' + [i])).addClass('md-checked');
    }
  }
}

$scope.toggleThankYou = function() {
  angular.element(document.querySelector('.thankYou')).toggleClass('md-checked');
}

}); //end of get call. ALL CODE MUST BE IN THESE BRACKETS!!!

}]);//end of controller declaration
