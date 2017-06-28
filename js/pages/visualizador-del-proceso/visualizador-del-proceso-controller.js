app.controller('VisualizadorDelProcesoController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $animate, $mdToast) {  

    var toast = $mdToast.simple()
            .hideDelay(3000)
            .position('top left')
            .parent($('body > main'));


	/* mapa *********************************************************************************/

	$scope.zoom = 1;
	$scope.minZoom = 1;
	$scope.maxZoom = 5;

	var mapaElement = $('#mapa');

	var defaultFocal = {
		'clientX': mapaElement.parent().width()/2, 
		'clientY': mapaElement.parent().height()/2
	}
	
	$scope.zoomIn = function(focal, animate) 
	{
		$scope.zoom = 1.2 * $scope.zoom;
		if ($scope.zoom > $scope.maxZoom) {
			$scope.zoom = $scope.maxZoom;
		}
		mapaElement.panzoom("zoom", $scope.zoom, {
			'animate':animate === undefined ? true : animate, 
			'focal': focal === undefined ? defaultFocal : focal
		});
	}
	
	$scope.zoomOut = function(focal, animate) 
	{
		$scope.zoom = 1 / 1.2 * $scope.zoom;
		if ($scope.zoom < $scope.minZoom) {
			$scope.zoom = $scope.minZoom;
		}
		mapaElement.panzoom("zoom", $scope.zoom, {
			'animate':animate === undefined ? true : animate, 
			'focal': focal === undefined ? defaultFocal : focal
		});
	}

	var $panzoom = mapaElement.panzoom({
        contain: 'invert'
	});

	// scroll to zoom
	$panzoom.parent().on('mousewheel.focal', function( e ) {
        e.preventDefault();
        var delta = e.delta || e.originalEvent.wheelDelta;
        var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
        if (zoomOut) {
        	$scope.zoomOut(e, false);
        }
        else {
        	$scope.zoomIn(e, false);
        }
    });

    // double click to zoom in
    mapaElement.dblclick(function(e) {
    	$scope.zoomIn(e, true);
    	$scope.zoomIn(e, true);
	});


    $scope.mapClick = function() 
    {
        console.log('mapClick');
        $('body.page-visualizador-del-proceso .popup').removeClass('open');
    }


    // calculate position on map (% to px)
    var mainPos = $('body.page-visualizador-del-proceso > main').offset();

    $scope.xPercentToPx = function(percent) 
    {
        return percent * $('#mapa img').width() / 100;
    }
    $scope.yPercentToPx = function(percent) 
    {
        return percent * $('#mapa img').height() / 100;
    }


    /* AGVs *********************************************************************************/

    $scope.AGVData = {};

    $animate.enabled($('.agvs'), false);

    $scope.loadAGVData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_agvs
         })
        .then(function(response) {
            // console.log(response.data);
            // add keys to array, otherwise animation does not work ...
            $scope.AGVData = {};
            for (i in response.data.get_agvsResult) {
                $scope.AGVData[response.data.get_agvsResult[i].id] = response.data.get_agvsResult[i];
            }
        });
    }
    ArtisterilIntervalService.start($scope.loadAGVData);


    

    $scope.openAGVPopup = function(event, agv) 
    {
        event.stopPropagation();

        $scope.selectedAGV = agv;
        var popup = $('body.page-visualizador-del-proceso #agv-popup');
        $('body.page-visualizador-del-proceso .popup').not(popup).removeClass('open');
        popup.addClass('open')
            .css('left', (event.clientX - mainPos.left) + 'px')
            .css('top', (event.clientY - mainPos.top) + 'px');
    }



    /* Semaphores *********************************************************************************/

    $scope.semaphoresData = {};

    $scope.loadSemaphoresData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_semaphores
         })
        .then(function(response) {
            // console.log(response.data);
            $scope.semaphoresData = response.data.get_semaphoresResult;
        });
    }
    // ArtisterilIntervalService.start($scope.loadSemaphoresData);
    $scope.loadSemaphoresData();


    $scope.openSemaphorePopup = function(event, semaphore) 
    {
        event.stopPropagation();

        $scope.selectedSemaphore = semaphore;
        var popup = $('body.page-visualizador-del-proceso #semaphore-popup');
        $('body.page-visualizador-del-proceso .popup').not(popup).removeClass('open');
        popup.addClass('open')
            .css('left', (event.clientX - mainPos.left) + 'px')
            .css('top', (event.clientY - mainPos.top) + 'px');
    }

    $scope.updateSemaphore = function(id) 
    {
        toast.content('Éxito')
            .toastClass('toast-success');
        $mdToast.show(toast);
        $('body.page-visualizador-del-proceso .popup').removeClass('open');
    }





	/* Transport belts *********************************************************************************/

    $scope.transportBeltsData = {};

    $scope.loadTransportBeltsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_transport_belts
         })
        .then(function(response) {
        	// console.log(response.data);
        	$scope.transportBeltsData = response.data.get_transport_beltsResult;
        });
    }
    // ArtisterilIntervalService.start($scope.loadTransportBeltsData);
    $scope.loadTransportBeltsData();


    $scope.openTransportBeltPopup = function(event, transportBelt) 
    {
        event.stopPropagation();

        $scope.selectedTransportBelt = transportBelt;
        var popup = $('body.page-visualizador-del-proceso #transport-belt-popup');
        $('body.page-visualizador-del-proceso .popup').not(popup).removeClass('open');
        popup.addClass('open')
            .css('left', (event.clientX - mainPos.left) + 'px')
            .css('top', (event.clientY - mainPos.top) + 'px');
    }

    $scope.updateTransportBelt = function(id) 
    {
        toast.content('Éxito')
            .toastClass('toast-success');
        $mdToast.show(toast);
        $('body.page-visualizador-del-proceso .popup').removeClass('open');
    }



	/* Storage Positions *********************************************************************************/

    $scope.loadStoragePositionsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_storage_positions
         })
        .then(function(response) {
        	// console.log(response.data);
            $scope.storagePositionsData = response.data.get_storage_positionsResult;
        });
    }
    $scope.loadStoragePositionsData();


    

    $scope.openPositionPopup = function(event, position) 
    {
        event.stopPropagation();

    	$scope.selectedPosition = position;
    	var popup = $('body.page-visualizador-del-proceso #position-popup');
        $('body.page-visualizador-del-proceso .popup').not(popup).removeClass('open');
        popup.addClass('open')
    		.css('left', (event.clientX - mainPos.left) + 'px')
    		.css('top', (event.clientY - mainPos.top) + 'px');

        $scope.loadStoragePositionNichesData(position.id);
    }


    $scope.loadStoragePositionNichesData = function(storage_position_id)
    {
        $scope.storagePositionNichesData = [];
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_storage_position_niches,
            params  : {'storage_position_id' : storage_position_id}
         })
        .then(function(response) {
            // console.log(response.data);
            $scope.storagePositionNichesData = response.data.get_storage_position_nichesResult;
        });
    }

});