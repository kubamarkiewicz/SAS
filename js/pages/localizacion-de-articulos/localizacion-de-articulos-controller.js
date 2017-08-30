app.controller('LocalizacionDeArticulosController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast) { 

   
    $scope.searchArticle = function()
    {
        $('button.search').attr("disabled", true).addClass('loading');

        $scope.article = {};

        return $http({
            method  : 'GET',
            url     : config.webservice.urls.localizacion_articulos_search_article,
            params  : {
                "type"  : $scope.type,
                "ref"   : $scope.ref
            }
         })
        .then(function(response) {
            $scope.article = response.data.search_articleResult;
            $rootScope.toast.content(response.data.search_articleResult.Message);
            if (response.data.search_articleResult.Result === true) {
                $rootScope.toast.toastClass('toast-success');
            }
            else {
                $rootScope.toast.toastClass('toast-error');
            }
            $mdToast.show($rootScope.toast);
            $('button.search').attr("disabled", false).removeClass('loading');
            $('input[name="ref"]').focus();
        });
    }


});