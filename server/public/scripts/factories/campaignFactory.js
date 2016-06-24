clientApp.factory('campaignFactory', ['$http', function($http) {

  // PRIVATE
  var campaign = undefined;

  function getCampaignData() {
    var promise = $http.get('/PLACEHOLDER').then(function(response) {
      console.log('Async data returned: ', response.data);
      campaign = response.data;
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
      return campaign;
    }
  };

  return publicApi;

}]);
