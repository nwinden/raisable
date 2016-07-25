var clientApp = angular.module('clientApp', ['ngFileUpload', 'ngMaterial', 'ng-currency']);

clientApp.config( function( $mdThemingProvider) {

  // Angular Theme Settings
  $mdThemingProvider.theme('default')
  //Adjust primary color (header, etc.)
  .primaryPalette('light-blue', {
    'default': '500',
    'hue-1': '700',
    'hue-2': '800'
  })
  //Adjust background color (under cards, etc.)
  .backgroundPalette('grey', {
               'default': '200'
               })
  //Adjust accent color (buttons, etc.)
  .accentPalette('deep-orange', {
    'default': '500',
    'hue-1': '700',
    'hue-2': '800'
  });

});
