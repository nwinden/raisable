clientApp.controller('HomeController', ['$scope', '$location', '$http', 'Upload', function($scope, $location, $http, Upload) {

    $scope.campaigns = [];
    $scope.featuredCampaigns = [];

    // --- Database call to get all campaigns to populate tiles on homepage --- //
    $scope.getCampaigns = function() {

        $http.get('/campaigns/all')
            .then(function(response) {
                $scope.campaigns = response.data;
                // --- Seperates featured campaigns from others to display in carousel --- //
                for (var i = 0; i < $scope.campaigns.length; i++) {
                    if ($scope.campaigns[i].featured === true) {
                        $scope.featuredCampaigns.push($scope.campaigns[i]);
                    }
                }
                // --- Campaign Tile Template --- //
                this.tiles = buildGridModel({
                    icon: "avatar:svg-",
                    title: "Svg-",
                    background: ""
                });
            });
    };

    $(document).ready(function() {
        //--- Home Page Carousel Settings --- //
        var swiper = new Swiper('.swiper-container', {
            paginationClickable: true,
            pagination: '.swiper-pagination',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 0,
            centeredSlides: true,
            autoplay: 5000,
            autoplayDisableOnInteraction: false,
            lazyLoading: true
        })
        //--- Home Page Campaign Search, Hides Carousel if user is enters characters into search field --- //
        if ($scope.searchInput !== undefined) {
            $scope.searching = true;
        }
    });

    // Sort Campaign Grids based on Campaign Deadline
    $scope.sort = $scope.campaigns.deadlineDate;

    //--- Build Campaign Grid Tiles --- //
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

            results.push(it);
        }
        return results;
    }

}]);
