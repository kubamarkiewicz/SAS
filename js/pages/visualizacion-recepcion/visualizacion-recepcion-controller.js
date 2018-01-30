app.controller('VisualizacionRecepcionController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast) {  



    // ASN

    $scope.sendASN = function() 
    {
        // start timers
        ArtisterilIntervalService.start($scope.getGltInAsnData);
        ArtisterilIntervalService.start($scope.getReadInProcessData, 500);
        ArtisterilIntervalService.start($scope.getGltIncomingData);
    }


    // GLT in ASN
  
    $scope.gltInAsnData = [];
    $scope.gltInAsnCablesCount = 0;
    
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
            // count cables
            $scope.gltInAsnCablesCount = 0;
            for (i in $scope.gltInAsnData) {
                if ($scope.gltInAsnData[i].Cable1) $scope.gltInAsnCablesCount++;
                if ($scope.gltInAsnData[i].Cable2) $scope.gltInAsnCablesCount++;
                if ($scope.gltInAsnData[i].Cable3) $scope.gltInAsnCablesCount++;
                if ($scope.gltInAsnData[i].Cable4) $scope.gltInAsnCablesCount++;
            }
        });
    }



    // Read in process

    $scope.readInProcessData = [];
    
    $scope.getReadInProcessData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.vis_reception_get_read_in_process,
            params  : {
                "asn" : $scope.asnNumber
            }
         })
        .then(function(response) {
            $scope.readInProcessData = {};
            if (response.data.reception_get_read_in_processResult) {
                for (i = 1; i <= 4; ++i) {
                    if (response.data.reception_get_read_in_processResult['ReadWire' + i] == "Código de cable") {
                        return;
                    }
                }
                if (response.data.reception_get_read_in_processResult.ReadWire1) {
                    $scope.readInProcessData = response.data.reception_get_read_in_processResult;
                } 
            }
        });
    }



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



    // GLT incoming 

    $scope.gltIncomingData = [];
    $scope.gltIncomingCablesCount = 0;
    
    $scope.getGltIncomingData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.vis_reception_get_glt_incoming,
            params  : {
                "asn" : $scope.asnNumber
            }
         })
        .then(function(response) {
            $scope.gltIncomingData = response.data.reception_get_glt_incomingResult;
            // count cables
            $scope.gltIncomingCablesCount = 0;
            for (i in $scope.gltIncomingData) {
                if ($scope.gltIncomingData[i].Cable1) $scope.gltIncomingCablesCount++;
                if ($scope.gltIncomingData[i].Cable2) $scope.gltIncomingCablesCount++;
                if ($scope.gltIncomingData[i].Cable3) $scope.gltIncomingCablesCount++;
                if ($scope.gltIncomingData[i].Cable4) $scope.gltIncomingCablesCount++;
            }
        });
    }


});