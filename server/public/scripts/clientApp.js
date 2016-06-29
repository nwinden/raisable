var clientApp = angular.module('clientApp', ['ngMaterial', 'jkAngularCarousel', 'ng-currency']);

clientApp.config([function() {
  console.log('Hey Buckaroo!');
}]);

//--- Home Page Campaign Search --- //
    clientApp.controller('SelectedTextController', function($scope) {
      $scope.items = [1, 2, 3, 4, 5, 6, 7];
      $scope.selectedItem;
      $scope.getSelectedText = function() {
        if ($scope.selectedItem !== undefined) {
          return "You have selected: Item " + $scope.selectedItem;
        } else {
          return "Please select an item";
        }
      };
    });

//--- Home Page Carousel --- //
    clientApp.controller('carouselController', function($scope) {
    $scope.dataArray = [
      {
        src: 'http://fireflymagic.com/press/firefly_magic_yard.jpg'
      },
      {
        src: 'http://www.oshkoshcorporation.com/news/mediacenter/defense/M-ATV_SpecialForcesVhcl_1_.jpg'
      },
      {
        src: 'http://community.thefoundry.co.uk/modo_601_support_files/version_20120227/style/image/modo_richard_yot_frog_3D_paint_hires.jpg'
      }
    ];
});

//--- Campaign Grid Tiles --- //

clientApp.controller('gridListDemoCtrl', function($scope) {
    this.tiles = buildGridModel({
            icon : "avatar:svg-",
            title: "Svg-",
            background: ""
          });
    function buildGridModel(tileTmpl){
      var it, results = [ ];
      for (var j=0; j<12; j++) {
        it = angular.extend({},tileTmpl);
        it.icon  = it.icon + (j+1);
        it.title = it.title + (j+1);
        it.span  = { row : 1, col : 1 };
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
  })
  // .config( function( $mdIconProvider ){
  //   $mdIconProvider.iconSet("avatar", 'icons/avatar-icons.svg', 128);
  // });
