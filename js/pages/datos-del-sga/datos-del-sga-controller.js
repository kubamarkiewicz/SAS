app.controller('DatosDelSGAController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService) {  


    // Signals flow

    $scope.signalsFlowData = [];
    
    $scope.getSignalsFlowData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.data_get_signals_flow
         })
        .then(function(response) {
            $scope.signalsFlowData = response.data.data_get_signals_flowResult;
        });
    }
    ArtisterilIntervalService.start($scope.getSignalsFlowData);



    // EDI files flow

    $scope.ediFilesFlowData = [];
    
    $scope.getEDIFilesFlowData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.data_get_edi_files_flow
         })
        .then(function(response) {
            $scope.ediFilesFlowData = response.data.data_get_edi_files_flowResult;
        });
    }
    ArtisterilIntervalService.start($scope.getEDIFilesFlowData);




    // GLT-wires flow

    $scope.GTLWiresFlowData = [];
    
    $scope.getGTLWiresFlowData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.data_get_glt_wires_flow
         })
        .then(function(response) {
            $scope.GTLWiresFlowData = response.data.data_get_glt_wires_flowResult;
        });
    }
    ArtisterilIntervalService.start($scope.getGTLWiresFlowData);




    // Alerts

	$scope.alertsData = [];
    
    $scope.getAlertsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_alerts
         })
        .then(function(response) {
            $scope.alertsData = response.data.get_alertsResult;
        });
    }
    ArtisterilIntervalService.start($scope.getAlertsData);
    // $scope.getAlertsData();




    // Blocked products

    $scope.blockedProductsData = [];
    
    $scope.getBlockedProductsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_blocked_products
         })
        .then(function(response) {
            $scope.blockedProductsData = response.data.get_blocked_productsResult;
        });
    }
    ArtisterilIntervalService.start($scope.getBlockedProductsData);

});