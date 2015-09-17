angular.module('app')
    .controller("SearchController", function ($scope, $http, $log, $timeout) {
    
    $scope.getImages = function getImagesHandler() {
        $log.log($scope.tag);
        $scope.images = null;
        var base = "https://api.instagram.com/v1";
        var clientId = 'db41ba125f924c9c989da80b82eb1f88';
        var request = '/tags/' + $scope.tag + '/media/recent';
        var url = base + request;
        var config = {
            'params': {
                'client_id': clientId,
                'count': 12,
                'callback': 'JSON_CALLBACK'
            }
        };
        $scope.trying = true;
        $http.jsonp(url, config)
            .success(function (result) {
                $scope.images = result.data;
                $log.log(result);
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