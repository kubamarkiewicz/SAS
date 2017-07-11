app.controller('DatosDelSGAController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService) {  


    // Signals flow

    $scope.signalsFlowL9Data = [];
    
    $scope.getSignalsFlowL9Data = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.data_get_signals_L9_flow
         })
        .then(function(response) {
            $scope.signalsFlowL9Data = response.data.get_signals_L9Result;
        });
    }
    ArtisterilIntervalService.start($scope.getSignalsFlowL9Data);



    $scope.signalsFlowM1Data = [];
    
    $scope.getSignalsFlowM1Data = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.data_get_signals_M1_flow
         })
        .then(function(response) {
            $scope.signalsFlowM1Data = response.data.get_signals_M1Result;
        });
    }
    ArtisterilIntervalService.start($scope.getSignalsFlowM1Data);



    // EDI files flow

    $scope.ediFilesFlowData = [];
    
    $scope.getEDIFilesFlowData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_edi_filesResult
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
            $scope.GTLWiresFlowData = response.data.get_edi_filesResult;
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
    // ArtisterilIntervalService.start($scope.getAlertsData);
    $scope.getAlertsData();




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
    $scope.getBlockedProductsData();

});