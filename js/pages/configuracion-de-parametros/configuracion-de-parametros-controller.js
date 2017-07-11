app.controller('ConfiguracionDeParametrosController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $animate, $mdToast) {  

    $scope.data = {};
    

    $scope.loadParametersData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_parameters
        })
        .then(function(response) {
            $scope.parametersData = response.data.get_parametersResult;

            // split data into two columns
            var length = Object.keys(response.data.get_parametersResult).length,
                half = Math.ceil(length / 2);

            $scope.parametersDataLeftKeys  = [];
            $scope.parametersDataRightKeys = [];

            var i = 1;
            for (key in $scope.parametersData) {
                if (i <= half) {
                    $scope.parametersDataLeftKeys.push(key);
                }
                else {
                    $scope.parametersDataRightKeys.push(key);
                }
                i++;
            }
        });
    }
    $scope.loadParametersData();



    $scope.slugify = function(text)
    {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }


    $scope.saveParametersData = function()
    {
        $('body.page-configuracion-de-parametros .md-button.save').attr("disabled", true).addClass('loading');


        var sendData = {};
        // console.log($scope.parametersData);
        for (key in $scope.parametersData) {
            sendData[key] = $scope.parametersData[key].Values || $scope.parametersData[key].Value;
        }
        // console.log(sendData);

        $http({
            method  : 'GET',
            url     : config.webservice.urls.save_parameters,
            params  : {"parameterlist" : JSON.stringify(sendData)}
        })
        .then(function(response) {
            $rootScope.toast.content('Éxito')
                .toastClass('toast-success');
            $mdToast.show($rootScope.toast);
            $('body.page-configuracion-de-parametros .md-button.save').attr("disabled", false).removeClass('loading');

            // reload data
            $scope.loadParametersData();
        });
    }


});