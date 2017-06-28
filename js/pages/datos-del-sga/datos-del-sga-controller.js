app.controller('DatosDelSGAController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService) {  

    // Alerts

	$scope.alertsData = [];
    
    $scope.getAlertsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_alerts
         })
        .then(function(response) {
        	// console.log(response.data);
            $scope.alertsData = response.data.get_alertsResult;
        });
    }
    ArtisterilIntervalService.start($scope.getAlertsData);




    // Blocked products

    $scope.blockedProductsData = [];
    
    $scope.getBlockedProductsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_blocked_products
         })
        .then(function(response) {
            // console.log(response.data);
            $scope.blockedProductsData = response.data.get_blocked_productsResult;
        });
    }
    ArtisterilIntervalService.start($scope.getBlockedProductsData);

});