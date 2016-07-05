clientApp.controller('HomeController', ['$scope', '$location', '$http', function($scope, $location, $http) {

    $scope.campaigns = [];
    $scope.featuredCampaigns = [];


    $scope.getCampaigns = function() {

        $http.get('/campaigns/all')
            .then(function(response) {

                $scope.campaigns = response.data;
                console.log($scope.campaigns);
                for (var i = 0; i < $scope.campaigns.length; i++) {
                    if ($scope.campaigns[i].featured === true) {
                        $scope.featuredCampaigns.push($scope.campaigns[i]);
                    }
                }
                this.tiles = buildGridModel({
                    icon: "avatar:svg-",
                    title: "Svg-",
                    background: ""
                });
                console.log(this.tiles);

                //--- Featured Widget --- //

                window.onload = function onLoad() {
                var bar = new ProgressBar.Line('#progress', {
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
                };


                //gramaticly correct backer message
                if ($scope.featuredCampaigns.donorCount == 1) {
                  $scope.backers = $scope.featuredCampaigns.donorCount + ' backer';
                } else {
                  $scope.backers = $scope.featuredCampaigns.donorCount + ' backers';
                }




                function timeRemaining() {
                    var deadline = moment($scope.featuredCampaigns.deadlineDate);
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
                    var progress = ($scope.featuredCampaigns.raised / $scope.featuredCampaigns.goal);
                    bar.animate(progress);
                    $scope.goal = $scope.featuredCampaigns.goal;
                    $scope.raised = $scope.featuredCampaigns.raised;
                }
            });
    };




    //--- Home Page Carousel --- //
    $(document).ready(function() {
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
        })

        //--- Home Page Campaign Search --- //
        if ($scope.searchInput !== undefined) {
            $scope.searching = true;


        }

    });







    //--- Campaign Grid Tiles --- //

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





}]);
