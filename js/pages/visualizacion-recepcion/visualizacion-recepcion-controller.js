app.controller('VisualizacionRecepcionController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService) {  


    // GLT in ASN

    $scope.gltInAsnData = [];
    
    $scope.getGltInAsnData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.vis_reception_get_glt_in_asn,
            params  : {
                "asn" : $scope.asnNumber
            }
         })
        .then(function(response) {
            
            $scope.gltInAsnData = response.data.reception_get_glt_in_asnResult;
            console.log(response.data);
        });
    }


    // Read in process

    $scope.readInProcessData = [];
    
    $scope.getReadInProcessData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.vis_reception_get_read_in_process
         })
        .then(function(response) {
            $scope.readInProcessData = response.data.reception_get_read_in_processResult;
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
            $scope.alertsData = response.data.reception_get_alertsResult;
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
            $scope.gltIncomingData = response.data.reception_get_glt_incomingResult;
        });
    }
    ArtisterilIntervalService.start($scope.getGltIncomingData);
    // $scope.getAlertsData();




});