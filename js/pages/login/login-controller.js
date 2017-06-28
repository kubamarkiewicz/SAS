app.controller('LoginController', function($scope, $rootScope, $http, $routeParams, config, $mdToast, $location, ArtisterilAuthService) { 

	$scope.loading = false;

    // page title
    $rootScope.pageTitle = 'Login';


    // SUBMIT FORM
    $scope.submit = function () 
    {
        $('#login-form button').attr("disabled", true).addClass('loading');

        $http({
            method  : 'GET',
            url     : config.webservice.urls.user_login,
            params 	: {'user' : $scope.username, 'password' : $scope.password}
        })
        .then(function(response) {
            // console.log(response.data);
            // console.log(response.data === true);
            if (response.data.user_loginResult === true) {

                ArtisterilAuthService.setUsername($scope.username);
            	
                // load user permissions
                ArtisterilAuthService.loadUserPermissions($scope.username);

                // redirect
                $location.url('/');
            }
            else { // incorrect password
        		$scope.loading = false;
        		
				var toast = $mdToast.simple()
				    .content('Usuario o contraseña no correcta')
				    .hideDelay(3000)
				    .position('top left')
				    .parent($('body > main'))
				    .toastClass('toast-error');
				$mdToast.show(toast);
            }

            $('#login-form button').attr("disabled", false).removeClass('loading');
        });
         
    }

});