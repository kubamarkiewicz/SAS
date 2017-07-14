app.controller('VisualizacionRecepcionController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService) {  


    // GLT in ASN

    $scope.gltInAsnData = [];
    
    $scope.getGltInAsnData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.vis_reception_get_glt_in_asn
         })
        .then(function(response) {
            $scope.gltInAsnData = response.data.get_glt_in_asnResult;
        });
    }
    ArtisterilIntervalService.start($scope.getGltInAsnData);
    // $scope.getAlertsData();



    // ASN

    $scope.asnData = [];
    
    $scope.getASNData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.vis_reception_get_asn
         })
        .then(function(response) {
            $scope.asnData = response.data.get_asnResult;
        });
    }
    ArtisterilIntervalService.start($scope.getASNData);
    // $scope.getAlertsData();


    // Read in process

    $scope.readInProcessData = [];
    
    $scope.getReadInProcessData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.vis_reception_get_read_in_process
         })
        .then(function(response) {
            $scope.readInProcessData = response.data.get_read_in_processResult;
        });
    }
    ArtisterilIntervalService.start($scope.getReadInProcessData);
    // $scope.getAlertsData();



    // Alerts

	$scope.alertsData = [];
    
    $scope.getAlertsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.vis_reception_get_alerts
         })
        .then(function(response) {
            $scope.alertsData = response.data.get_alertsResult;
        });
    }
    ArtisterilIntervalService.start($scope.getAlertsData);
    // $scope.getAlertsData();



    // GLT incoming 

    $scope.gltIncomingData = [];
    
    $scope.getGltIncomingData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.vis_reception_get_glt_incoming
         })
        .then(function(response) {
            $scope.gltIncomingData = response.data.get_glt_incomingResult;
        });
    }
    ArtisterilIntervalService.start($scope.getGltIncomingData);
    // $scope.getAlertsData();




});