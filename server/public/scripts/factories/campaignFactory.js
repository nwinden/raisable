clientApp.factory('campaignFactory', ['$http', '$location', function($http, $location) {

  // PRIVATE
  var campaigns = undefined;
  var landingPageCampaign = undefined;

  function getCampaignData() {
    var promise = $http.get('/PLACEHOLDER').then(function(response) {
      console.log('Async data returned: ', response.data);
      campaigns = response.data;
    });

    return promise;
  }


  // PUBLIC
  var publicApi = {
    factoryRefreshCampaignData: function() {
      return getCampaignData();
    },
    factoryGetCampaign: function() {
      // return our array
      return campaigns;
    },
    factorySetLandingPage: function (campaign) {
      landingPageCampaign = campaign;
    },
    factoryGetLandingPage: function () {
      return landingPageCampaign;
    }
  };

  return publicApi;

}]);
