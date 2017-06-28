var ArtisterilAuthService = angular.module('ArtisterilAuthService', [])
.service('ArtisterilAuthService', function ($rootScope, $location, $http) 
{

    // load user from localStorage
    $rootScope.username = localStorage.username;
    $rootScope.user_permissions = [];

    this.setUsername = function(username) 
    {
        $rootScope.username = localStorage.username = username;
    };

    this.loadUserPermissions = function(username) 
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.user_has_access,
            params  : {'user': username}
        })
        .then(function(response) {
            // set permissions
            $rootScope.user_permissions = {};
            $rootScope.user_permissions['visualizador-del-proceso'] = response.data.user_has_accessResult['Visualizador_del_proceso'];
            $rootScope.user_permissions['datos-del-sga'] = response.data.user_has_accessResult['Datos_del_sga'];
            $rootScope.user_permissions['configuracion-de-parametros'] = response.data.user_has_accessResult['Configuracion_de_parametros'];
            $rootScope.user_permissions['bloqueo-de-productos'] = response.data.user_has_accessResult['Bloqueos'];
            $rootScope.user_permissions['recepcion-de-productos'] = response.data.user_has_accessResult['Recepcion_de_productos'];
            $rootScope.user_permissions['modo-manual'] = response.data.user_has_accessResult['Modo_manual'];
        });
    };

    this.auth = function(page_slug) 
    {
        // user not logged in
        if (!$rootScope.username) {
            console.log("please log in");
            $location.url('/login');
        }
    }

    this.logout = function()
    {
        $rootScope.username = localStorage.username = '';
    	$rootScope.user_permissions = [];
		$location.url('/login');
    }
    
    // load user permisions
    if ($rootScope.username) {
        this.loadUserPermissions($rootScope.username);
    }

});