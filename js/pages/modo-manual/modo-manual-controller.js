app.controller('ModoManualProductosController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast) {  

    $scope.nefab_code_length = config.config.nefab_code_length;
    $scope.cable_code_length = config.config.cable_code_length;


    var toast = $mdToast.simple()
            .hideDelay(3000)
            .position('top left')
            .parent($('body > main'));



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
                $scope.cable1 = response.data.get_reader_readingResult.Cables.Cable1;
                $scope.cable2 = response.data.get_reader_readingResult.Cables.Cable2;
                $scope.cable3 = response.data.get_reader_readingResult.Cables.Cable3;
                $scope.cable4 = response.data.get_reader_readingResult.Cables.Cable4;

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

        $http({
            method  : 'GET',
            url     : config.webservice.urls.select_action,
            params  : {
                "action" : $scope.action, 
                "reader" : JSON.stringify({
                    "Nefab": $scope.nefab, 
                    "Cables": {
                        "Cable1": $scope.cable1,
                        "Cable2": $scope.cable2,
                        "Cable3": $scope.cable3,
                        "Cable4": $scope.cable4
                    }
                }), 
                "product" : $scope.productId
            }
         })
        .then(function(response) {
            // console.log(response.data);
            toast.content(response.data.add_warehouseOrderResult.Message)
                .parent($('body > main'));
            if (response.data.add_warehouseOrderResult.Result === true) {
                toast.toastClass('toast-success');
            }
            else {
                toast.toastClass('toast-error');
            }
            $mdToast.show(toast);

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
            params  : {'actionlist' : fileContent}
        })
        .then(function(response) {
            // console.log(response.data);
            toast.content(response.data.upload_warehouseOrders_fileResult.Message)
                .parent($('form[name="fileForm"]'));
            if (response.data.upload_warehouseOrders_fileResult.Result === true) {
                toast.toastClass('toast-success');
            }
            else {
                toast.toastClass('toast-error');
            }
            $mdToast.show(toast);
            
            $('form.upload-file button').attr("disabled", false).removeClass('loading');
            $('#uploadFileInput').val('');
        });
    }


    $("button.clear").click(function(){
        $(this).parent().find('input').val('');
    });


});