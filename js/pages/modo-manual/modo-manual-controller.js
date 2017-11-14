app.controller('ModoManualProductosController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast, $window) {  

    $scope.nefab_code_length = config.config.nefab_code_length;
    $scope.cable_code_length = config.config.cable_code_length;


    // get actions

    $scope.actionsData = [];

    $scope.getActionsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_actions
         })
        .then(function(response) {
            $scope.actionsData = response.data.get_actionsResult;
        });
    }
    $scope.getActionsData();



    // get readers

    $scope.readersData = [];

    $scope.getReadersData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_readers_for_manual_mode
         })
        .then(function(response) {
            $scope.readersData = response.data.get_readersResult;
        });
    }
    // $scope.getReadersData();
    ArtisterilIntervalService.start($scope.getReadersData, 5000);


    // select reader

    $scope.readerId = '';
    $scope.lastReading = null;

    $scope.selectReader = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.select_reader_for_manual_mode,
            params  : {"id" : $scope.readerId}
         })
        .then(function(response) {
        });

        // start recieving data from reader
        ArtisterilIntervalService.start($scope.getReaderReading, 1000, 'getReaderReading');
    }

    $scope.getReaderReading = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_reading_for_manual_mode
         })
        .then(function(response) {

            // add product to input
            if (response.data.get_reader_readingResult) {

                // do not repeat reading
                if ($scope.lastReading 
                        && ($scope.lastReading.Nefab == response.data.get_reader_readingResult.Nefab)
                        && ($scope.lastReading.Cable == response.data.get_reader_readingResult.Cable)
                    ) {
                    return;
                }

                $scope.nefab = response.data.get_reader_readingResult.Nefab;
                $scope.cable = response.data.get_reader_readingResult.Cable;

                // stop interval
                // ArtisterilIntervalService.stop('getReaderReading');

                $scope.lastReading = response.data.get_reader_readingResult;
            }
        });
    }



    // execute action 

    $scope.executeAction = function()
    {
        if (!$scope.action) {
            return;
        }

        $('button.execute-acton').attr("disabled", true).addClass('loading');

        if ($scope.pasillo) {
            var pasillo = $scope.pasillo.toString();
            var posicion = $scope.posicion.toString();
            var altura = $scope.altura.toString();
            if (pasillo.length == 1) pasillo = "0" + pasillo;
            if (posicion.length == 1) posicion = "0" + posicion;
            if (altura.length == 1) altura = "0" + altura;
        }
        
        $http({
            method  : 'GET',
            url     : config.webservice.urls.select_action,
            params  : {
                "action" : $scope.action, 
                "reader" : $scope.readerId, 
                "product" : $scope.action == $scope.pdfAction ? $scope.cable : JSON.stringify([
                    $scope.nefab, 
                    $scope.cable,
                    pasillo,
                    posicion,
                    altura
                ])
            }
         })
        .then(function(response) {
            $rootScope.toast.content(response.data.add_warehouseOrderResult.Message);
            if (response.data.add_warehouseOrderResult.Result === true) {
                $rootScope.toast.toastClass('toast-success');
            }
            else {
                $rootScope.toast.toastClass('toast-error');
            }
            $mdToast.show($rootScope.toast);

            $('button.execute-acton').attr("disabled", false).removeClass('loading');

            // reset fields
            // $scope.action = null;
            // $scope.readerId = null;
            $scope.nefab    = '';
            $scope.cable    = '';
            $scope.pasillo  = '';
            $scope.posicion = '';
            $scope.altura   = '';

            // reset form and disable error messages
            $scope.actionForm.$setPristine();
            $scope.actionForm.$setUntouched();
        });
    }


    $scope.clearReading = function() 
    {
        $scope.productId = '';
    }



    // open PDF 

    $scope.pdfAction = "Informe de cable";

    $scope.openPDF = function()
    {
        if (!$scope.action) {
            return;
        }

        $window.open(config.webservice.urls.select_action + '?action=' + $scope.action + '&product=' + $scope.cable);

        // reset fields
        $scope.cable = '';

        // reset form and disable error messages
        $scope.actionForm.$setPristine();
        $scope.actionForm.$setUntouched();
    }



    // get file actions

    $scope.fileActionsData = [];

    $scope.getFileActionsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.manual_get_file_actions
         })
        .then(function(response) {
            $scope.fileActionsData = response.data.get_file_actionsResult;
        });
    }
    $scope.getFileActionsData();

    // upload file

    $scope.uploadFile = function()
    {
        if (!$scope.fileAction) {
            return;
        }

        $('form.upload-file button').attr("disabled", true).addClass('loading');

        // read file as text
        var reader = new FileReader();
        reader.onload = function(){
            $scope.uploadActionsFile(reader.result);
        };
        reader.readAsText(document.getElementById('uploadFileInput').files[0]);
    }

    $scope.uploadActionsFile = function(fileContent)
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.upload_actions_file,
            params  : {
                "action" : $scope.fileAction,
                'actionlist' : fileContent
            }
        })
        .then(function(response) {
            $rootScope.toast.content(response.data.upload_warehouseOrders_fileResult.Message);
            if (response.data.upload_warehouseOrders_fileResult.Result === true) {
                $rootScope.toast.toastClass('toast-success');
            }
            else {
                $rootScope.toast.toastClass('toast-error');
            }
            $mdToast.show($rootScope.toast);
            
            $('form.upload-file button').attr("disabled", false).removeClass('loading');
            
            // reset fields
            // $scope.fileAction = '';
            // $('#uploadFileInput').val('');

            // reset form and disable error messages
            $scope.fileForm.$setPristine();
            $scope.fileForm.$setUntouched();
        });
    }


    $("button.clear").click(function(){
        $(this).parent().find('input').val('');
    });




    // get notification actions

    $scope.notificationActionsData = [];

    $scope.getNotificationActionsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.manual_get_notification_actions
         })
        .then(function(response) {
            $scope.notificationActionsData = response.data.get_notification_actionsResult;
        });
    }
    $scope.getNotificationActionsData();


    // generate notification 

    $scope.generateNotification = function()
    {
        if (!$scope.notificationAction) {
            return;
        }

        $http({
            method  : 'GET',
            url     : config.webservice.urls.manual_generate_notification,
            params  : {
                "action" : $scope.notificationAction
            }
         })
        .then(function(response) {
            $rootScope.toast.content(response.data.generate_notificationResult.Message);
            if (response.data.generate_notificationResult.Result === true) {
                $rootScope.toast.toastClass('toast-success');
            }
            else {
                $rootScope.toast.toastClass('toast-error');
            }
            $mdToast.show($rootScope.toast);

            // reset fields
            // $scope.notificationActionsData = '';

            // reset form and disable error messages
            $scope.notificationForm.$setPristine();
            $scope.notificationForm.$setUntouched();
        });
    }




    // get MXQ ordenes

    $scope.mxqOrdenesData = [];

    $scope.getMxqOrdenesData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.manual_get_mxq_ordenes
         })
        .then(function(response) {
            $scope.mxqOrdenesData = response.data.get_mxq_ordenesResult;
        });
    }
    // $scope.getMxqOrdenesData();
    ArtisterilIntervalService.start($scope.getMxqOrdenesData, 5000);



    $scope.eliminarOrden = function(id)
    {        
        if (!confirm("Estas seguro que quieres eliminar esta orden?")) {
            return;
        }

        $http({
            method  : 'GET',
            url     : config.webservice.urls.manual_delete_mxq_orden,
            params  : {
                "Id" : id 
            }
         })
        .then(function(response) {
            $rootScope.toast.content(response.data["delete_mxq_ordenResult"].Message);
            if (response.data["delete_mxq_ordenResult"].Result === true) {
                $rootScope.toast.toastClass('toast-success');
            }
            else {
                $rootScope.toast.toastClass('toast-error');
            }
            $mdToast.show($rootScope.toast);

            $scope.getMxqOrdenesData();
        });
    } 



});