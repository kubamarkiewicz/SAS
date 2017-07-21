app.controller('VisualizacionRecepcionController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast) {  


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



    // generate notification

    $scope.generateNotification = function()
    {
        if (!$scope.asnNumber) {
            return;
        }

        $('button.generate-notification').attr("disabled", true).addClass('loading');

        $http({
            method  : 'GET',
            url     : config.webservice.urls.vis_reception_generate_notification,
            params  : {
                "asn" : $scope.asnNumber
            }
         })
        .then(function(response) {
            $rootScope.toast.content("Exito");
            $rootScope.toast.toastClass('toast-success');
            $mdToast.show($rootScope.toast);
            $('button.generate-notification').attr("disabled", false).removeClass('loading');
        });
    }


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