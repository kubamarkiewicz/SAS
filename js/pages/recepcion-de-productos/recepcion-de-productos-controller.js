app.controller('RecepcionDeProductosController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast) { 

    $scope.nefab_code_length = config.config.nefab_code_length;
    $scope.cable_code_length = config.config.cable_code_length;
  

    // receive product

    $scope.nefab = '';
    $scope.cable1 = '';
    $scope.cable2 = '';
    $scope.cable3 = '';
    $scope.cable4 = '';
    $scope.selectedProducts = [];

    $scope.receiveProductByInput = function()
    {
        if (!$scope.cable2) $scope.cable2 = '0000000000';
        if (!$scope.cable3) $scope.cable3 = '0000000000';
        if (!$scope.cable4) $scope.cable4 = '0000000000';
        $scope.selectedProducts.push([
            $scope.nefab,
            $scope.cable1,
            $scope.cable2,
            $scope.cable3,
            $scope.cable4
        ]);
        $scope.nefab = '';
        $scope.cable1 = '';
        $scope.cable2 = '';
        $scope.cable3 = '';
        $scope.cable4 = '';
        $scope.productForm.$setPristine();
        $scope.productForm.$setUntouched();
    }


    $scope.receiveProducts = function()
    {
        if (!$scope.selectedProducts.length) {
            return;
        }

        $('button.receive-products').attr("disabled", true).addClass('loading');

        $http({
            method  : 'GET',
            url     : config.webservice.urls.receive_products,
            params  : {"productlist" : JSON.stringify($scope.selectedProducts)}
         })
        .then(function(response) {
            // console.log(response.data);
            $rootScope.toast.content(response.data.receive_productsResult.Message);
            if (response.data.receive_productsResult.Result === true) {
                $rootScope.toast.toastClass('toast-success');
            }
            else {
                $rootScope.toast.toastClass('toast-error');
            }
            $mdToast.show($rootScope.toast);
            $('button.receive-products').attr("disabled", false).removeClass('loading');
            $scope.selectedProducts = [];
        });
    }



    $scope.removeFromSelection = function(item) 
    {
        var index = $scope.selectedProducts.indexOf(item);
        if (index > -1) {
            $scope.selectedProducts.splice(index, 1);
        }
    }


    // get readers

    $scope.readersData = [];

    $scope.getReadersData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_readers_for_receiving
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
        $('form.reader button').attr("disabled", true).addClass('loading');

        return $http({
            method  : 'GET',
            url     : config.webservice.urls.select_reader_for_receiving,
            params  : {"id" : $scope.readerId}
         })
        .then(function(response) {
            // console.log(response.data);
            $rootScope.toast.content('Éxito')
                .toastClass('toast-success');
            $mdToast.show($rootScope.toast);
            $('form.reader button').attr("disabled", false).removeClass('loading');

            // start recieving data from reader
            ArtisterilIntervalService.start($scope.getReaderReading);
        });
    }

    $scope.getReaderReading = function()
    {
        return $http({
            method  : 'GET',
            url     : config.webservice.urls.get_reading_for_receiving
         })
        .then(function(response) {
            // console.log(response.data);

            // add products to selection
            if (response.data.get_reader_readingResult) {
                $scope.selectedProducts.push([
                    response.data.get_reader_readingResult.Nefab,
                    response.data.get_reader_readingResult.Cable1,
                    response.data.get_reader_readingResult.Cable2,
                    response.data.get_reader_readingResult.Cable3,
                    response.data.get_reader_readingResult.Cable4
                ]);
            }
        });
    }


    // upload file

    $scope.uploadFile = function()
    {
        $('form.upload-file button').attr("disabled", true).addClass('loading');

        // read file as text
        var reader = new FileReader();
        reader.onload = function(){
            $scope.receiveProductsFromFile(reader.result);
        };
        reader.readAsText(document.getElementById('uploadFileInput').files[0]);
    }

    $scope.receiveProductsFromFile = function(fileContent)
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.receive_products_from_file,
            params  : {'productlist' : fileContent}
        })
        .then(function(response) {
            // console.log(response.data);
            $rootScope.toast.content('Éxito')
                .toastClass('toast-success');
            $mdToast.show($rootScope.toast);
            $('form.upload-file button').attr("disabled", false).removeClass('loading');
            $('#uploadFileInput').val('');
        });
    }


});