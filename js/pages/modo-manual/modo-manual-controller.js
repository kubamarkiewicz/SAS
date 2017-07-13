app.controller('ModoManualProductosController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast) {  

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
            // console.log(response.data);
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
            // console.log(response.data);
            $scope.readersData = response.data.get_readersResult;
        });
    }
    // $scope.getReadersData();
    ArtisterilIntervalService.start($scope.getReadersData, 5000);


    // select reader

    $scope.readerId = '';

    $scope.selectReader = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.select_reader_for_manual_mode,
            params  : {"id" : $scope.readerId}
         })
        .then(function(response) {
            // console.log(response.data);
        });

        // start recieving data from reader
        ArtisterilIntervalService.start($scope.getReaderReading, 1000, 'getReaderReading');
    }

    $scope.getReaderReading = function()
    {
        return $http({
            method  : 'GET',
            url     : config.webservice.urls.get_reading_for_manual_mode
         })
        .then(function(response) {
            // console.log(response.data);

            // add product to input
            if (response.data.get_reader_readingResult) {
                $scope.nefab = response.data.get_reader_readingResult.Nefab;
                $scope.cable1 = response.data.get_reader_readingResult.Cable1;
                $scope.cable2 = response.data.get_reader_readingResult.Cable2;
                $scope.cable3 = response.data.get_reader_readingResult.Cable3;
                $scope.cable4 = response.data.get_reader_readingResult.Cable4;

                // stop interval
                ArtisterilIntervalService.stop('getReaderReading');
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
        
        if (!$scope.cable2) $scope.cable2 = '0000000000';
        if (!$scope.cable3) $scope.cable3 = '0000000000';
        if (!$scope.cable4) $scope.cable4 = '0000000000';

        $http({
            method  : 'GET',
            url     : config.webservice.urls.select_action,
            params  : {
                "action" : $scope.action, 
                "reader" : $scope.readerId, 
                "product" : JSON.stringify([
                    $scope.nefab, 
                    $scope.cable1,
                    $scope.cable2,
                    $scope.cable3,
                    $scope.cable4
                ])
            }
         })
        .then(function(response) {
            // console.log(response.data);
            $rootScope.toast.content(response.data.add_warehouseOrderResult.Message);
            if (response.data.add_warehouseOrderResult.Result === true) {
                $rootScope.toast.toastClass('toast-success');
            }
            else {
                $rootScope.toast.toastClass('toast-error');
            }
            $mdToast.show($rootScope.toast);

            $('button.execute-acton').attr("disabled", false).removeClass('loading');

            // reset form and disable error messages
            $scope.action = null;
            $scope.readerId = null;
            $scope.nefab = '';
            $scope.cable1 = '';
            $scope.cable2 = '';
            $scope.cable3 = '';
            $scope.cable4 = '';
            $scope.actionForm.$setPristine();
            $scope.actionForm.$setUntouched();
        });
    }


    $scope.clearReading = function() 
    {
        $scope.productId = '';
    }



    // upload file

    $scope.uploadFile = function()
    {
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
                "action" : $scope.action,
                'actionlist' : fileContent}
        })
        .then(function(response) {
            // console.log(response.data);
            $rootScope.toast.content(response.data.upload_warehouseOrders_fileResult.Message);
            if (response.data.upload_warehouseOrders_fileResult.Result === true) {
                $rootScope.toast.toastClass('toast-success');
            }
            else {
                $rootScope.toast.toastClass('toast-error');
            }
            $mdToast.show($rootScope.toast);
            
            $('form.upload-file button').attr("disabled", false).removeClass('loading');
            $('#uploadFileInput').val('');
        });
    }


    $("button.clear").click(function(){
        $(this).parent().find('input').val('');
    });




    // get PDF actions

    $scope.pdfActionsData = [];

    $scope.getPdfActionsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.manual_get_pdf_actions
         })
        .then(function(response) {
            // console.log(response.data);
            $scope.pdfActionsData = response.data.get_pdf_actionsResult;
        });
    }
    $scope.getPdfActionsData();


});