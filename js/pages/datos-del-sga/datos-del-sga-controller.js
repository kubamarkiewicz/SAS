app.controller('DatosDelSGAController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService) {  


    // Popup Alerts

    $scope.popupAlertsData = {};
    $scope.popupAlertsCount = 0;

    $scope.getPopupAlertsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.data_get_popup_alerts
         })
        .then(function(response) {
            $scope.popupAlertsData = response.data.get_popup_alertsResult;
        });
    }
    ArtisterilIntervalService.start($scope.getPopupAlertsData);
    // $scope.getPopupAlertsData();


    $("section.popup-alerts .open").click(function(){
        $("section.popup-alerts").removeClass('closed');
        ArtisterilIntervalService.start($scope.closePopupAlerts, 300000, 'closePopupAlerts', true);
    });
    $("section.popup-alerts .close").click(function(){
        $scope.closePopupAlerts();
    });

    $scope.closePopupAlerts = function() {
        $("section.popup-alerts").addClass('closed');
        ArtisterilIntervalService.stop('closePopupAlerts');
    }


    $scope.deleteAlert = function(Id)
    {
        $("section.popup-alerts .alert[data-id='" + Id + "'] a.delete").addClass('loading');
        $http({
            method  : 'GET',
            url     : config.webservice.urls.data_delete_popup_alert,
            params  : {
                "Id"   : Id
            }
         })
        .then(function(response) {
        });
    } 

    



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
    ArtisterilIntervalService.start($scope.getSignalsFlowL9Data, 10000);



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
    ArtisterilIntervalService.start($scope.getSignalsFlowM1Data, 10000);



    // EDI files flow

    $scope.ediFilesFlowData = [];
    
    $scope.getEDIFilesFlowData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.data_get_edi_files_flow
         })
        .then(function(response) {
            $scope.ediFilesFlowData = {};
            for (i in response.data.get_edi_filesResult) {
                $scope.ediFilesFlowData[response.data.get_edi_filesResult[i].Files] = response.data.get_edi_filesResult[i].Info;
            }
        });
    }
    ArtisterilIntervalService.start($scope.getEDIFilesFlowData, 10000);




    // GLT-wires flow

    $scope.GTLWiresFlowData = [];
    
    $scope.getGTLWiresFlowData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.data_get_glt_wires_flow
         })
        .then(function(response) {
            $scope.GTLWiresFlowData = response.data.get_glt_wiresResult;
        });
    }
    ArtisterilIntervalService.start($scope.getGTLWiresFlowData, 10000);




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
    ArtisterilIntervalService.start($scope.getBlockedProductsData, 10000);
    // $scope.getBlockedProductsData();

});