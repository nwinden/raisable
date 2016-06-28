clientApp.controller('HomeController', ['$scope', '$location', '$http', function($scope, $location, $http) {
  console.log('Home Controller!');

  $scope.getCampaigns = function () {
    $http.get('/campaigns/all')
    .then(function (response) {
      $scope.campaigns = response.data;
      console.log($scope.campaigns);
      this.tiles = buildGridModel({
        icon : "avatar:svg-",
        title: "Svg-",
        background: ""
      });

    });

  };

  //--- Home Page Campaign Search --- //
    $scope.searchInput;
      $scope.items = ["Category","Keyword", "Zipcode"];
      $scope.selectedItem;
      $scope.getSelectedText = function() {
        if ($scope.selectedItem !== undefined) {
          return $scope.selectedItem;
        } else {
          return " Select ";
        }
      };

      $scope.campaignSearch = function () {
        alert("Sumbitted: " + $scope.searchInput + " and " + $scope.selectedItem);

      };

  //--- Home Page Carousel --- //
      $scope.dataArray = [
        {
          src: 'http://www.oshkoshcorporation.com/news/mediacenter/defense/M-ATV_SpecialForcesVhcl_1_.jpg',
          name: 'Tartan High'
        },
        {
          src: 'http://www.oshkoshcorporation.com/news/mediacenter/defense/M-ATV_SpecialForcesVhcl_1_.jpg',
          name: 'Tartan High'
        },
        {

          src: 'http://community.thefoundry.co.uk/modo_601_support_files/version_20120227/style/image/modo_richard_yot_frog_3D_paint_hires.jpg',
          name: 'Sibley High'
        }
      ];

  //--- Campaign Grid Tiles --- //
      // this.tiles = buildGridModel({
      //   icon : "avatar:svg-",
      //   title: "Svg-",
      //   background: ""
      // });

      function buildGridModel(tileTmpl){
        var it, results = [ ];
        for (var j=0; j<$scope.campaigns.length; j++) {
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
      svgStyle: {width: '100%', height: '100%'}
    });

    // changeProgressBar(); //runs once on page load

    // function changeProgressBar() {
    //   var progress = ($scope.campaign.raised / $scope.campaign.goal);
    //   bar.animate(progress); //posibly 'return' this
    //   $scope.goal = $scope.campaign.goal / 100;
    //   $scope.raised = $scope.campaign.raised / 100;
    // }



  }]);
