angular.module('app')
    .controller("SearchController", function ($scope, $http, $log, $timeout, $location) {

    $scope.clientId = 'db41ba125f924c9c989da80b82eb1f88';
    $scope.clientSecret = '47baa59d1ecd45bda09c41792cd4d3d0';
    $scope.redirectUrl = "http%3A%2F%2Fmattrwh.github.io%2FInstaSearch%2F%3F";
    $scope.accessToken = $location.search().access_token;
    if (!!$scope.accessToken) {
      $scope.authenticated = true;
    } else {
      $scope.authenticated = false;
    }
    $log.log("search", $scope.accessToken);

    
    var _instagramUrl = "https://api.instagram.com/oauth/authorize/?client_id=";
    $scope.instagramUrl =  _instagramUrl + $scope.clientId + "&redirect_uri=" + $scope.redirectUrl + "&response_type=token&scope=public_content";
    

    $scope.getImages = function getImagesHandler() {
        $log.log("tag", $scope.tag);
        $scope.images = null;
        var base = "https://api.instagram.com/v1";
        var request = '/tags/' + $scope.tag + '/media/recent';
        var url = base + request;
        var config = {
            'params': {
                'access_token': $scope.accessToken,
                'count': 12,
                'callback': 'JSON_CALLBACK',
            }
        };

        $scope.trying = true;
        $http.jsonp(url, config)
            .success(function (result) {
                $scope.images = result.data;
                $log.log("data", result);
                $scope.trying = false;
                $scope.success = true;
                $timeout(function() {
                    $scope.success = false;
                }, 2000);
            })
            .error(function() {
                $log.log("Error, request not valid!");
                $scope.trying = false;
                $scope.error = true;
                $timeout(function() {
                    $scope.error = false;
                }, 2000);
            });
        $scope.tag = "";
    }
});
