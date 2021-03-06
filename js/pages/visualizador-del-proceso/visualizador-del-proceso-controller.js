app.controller('VisualizadorDelProcesoController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $animate, $mdToast, $timeout) {  




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



	/* mapa *********************************************************************************/

	$scope.zoom = 1;

	var mapaElement = $('#mapa');

	var centerFocal = {
		'clientX': mapaElement.parent().width()/2, 
		'clientY': mapaElement.parent().height()/2
	}
    var defaultFocal = centerFocal;

    var defaultZoomRate = 1.2;
	
	$scope.zoomIn = function(focal, animate, zoomRate) 
	{
		$scope.zoom = (zoomRate ? zoomRate : defaultZoomRate) * $scope.zoom;
		if ($scope.zoom > config.map.max_zoom) {
			$scope.zoom = config.map.max_zoom;
		}
		mapaElement.panzoom("zoom", $scope.zoom, {
			'animate':animate === undefined ? true : animate, 
			'focal': focal === undefined ? defaultFocal : focal
		});

        // close popups
        $('body.page-visualizador-del-proceso .popup').removeClass('open');
	}
	
	$scope.zoomOut = function(focal, animate, zoomRate) 
	{
        if (focal) {
            defaultFocal = focal;
        }
		$scope.zoom = 1 / (zoomRate ? zoomRate : defaultZoomRate) * $scope.zoom;
		if ($scope.zoom < config.map.min_zoom) {
			$scope.zoom = config.map.min_zoom;
		}
		mapaElement.panzoom("zoom", $scope.zoom, {
			'animate':animate === undefined ? true : animate, 
			'focal': focal === undefined ? defaultFocal : focal
		});

        // close popups
        $('body.page-visualizador-del-proceso .popup').removeClass('open');
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
        	$scope.zoomOut(e, false, 1.1);
        }
        else {
        	$scope.zoomIn(e, false, 1.1);
        }
    });

    // double click to zoom in
    mapaElement.dblclick(function(e) {
    	$scope.zoomIn(e, true, 1.44);
	});

    // on map click
    $("#mapa").on('click touchend', function(event) {
        // close popups
        // $('body.page-visualizador-del-proceso .popup').removeClass('open');
        $scope.deselectAllObjects();

        // console.log($scope.pxToMetersX(event.offsetY) + ' : ' + $scope.pxToMetersY(event.offsetX));
        console.log($scope.pxToPercentsX(event.offsetX) + ' : ' + $scope.pxToPercentsY(event.offsetY));
    });

    

    var mainPos = $('body.page-visualizador-del-proceso > main').offset();


    $scope.deselectAllObjects = function() 
    {
        // close all popups
        $('body.page-visualizador-del-proceso .popup').removeClass('open');
        // deselect all objects
        $('body.page-visualizador-del-proceso #mapa > *').removeClass('selected');
    }



    /* calculate positions on map (convert meters to px) *******************************************/

    var mapImg = $('#map-image');

    $scope.metersToPxX = function(y)
    {
        return (parseFloat(config.map.meters_offset_y) - parseFloat(y)) * parseFloat(mapImg.width()) / parseFloat(config.map.meters_width);
    }
    
    $scope.metersToPxY = function(x) 
    {
        return (parseFloat(config.map.meters_offset_x) - parseFloat(x)) * parseFloat(mapImg.height()) / parseFloat(config.map.meters_height);
    }

    $scope.pxToMetersX = function(y)
    {
        return parseFloat(config.map.meters_offset_x) - parseFloat(y) * parseFloat(config.map.meters_height) / parseFloat(mapImg.height());
    }

    $scope.pxToMetersY = function(x) 
    {
        return parseFloat(config.map.meters_offset_y) - parseFloat(x) * parseFloat(config.map.meters_width) / parseFloat(mapImg.width());
    }

    $scope.pxToPercentsX = function(x)
    {
        return (parseFloat(x) / parseFloat(mapImg.width()) * 100).toFixed(2);
    }

    $scope.pxToPercentsY = function(y) 
    {
        return (parseFloat(y) / parseFloat(mapImg.height()) * 100).toFixed(2);
    }

    $scope.calculateRotation = function(angle) 
    {
        return 180 - parseFloat(angle);
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
            // add keys to array, otherwise animation does not work ...
            $scope.AGVData = {};
            for (i in response.data.get_agvsResult) {
                $scope.AGVData[response.data.get_agvsResult[i].Id] = response.data.get_agvsResult[i];
            }
        });
    }
    ArtisterilIntervalService.start($scope.loadAGVData, 500);
    // $scope.loadAGVData();


    $scope.onAGVsRendered = function() 
    {
        $("#mapa .agv").on('click touchend', function(event) {
            event.stopPropagation();
            $scope.deselectAllObjects();
            var target = $(event.target);
            target.addClass('selected');

            $scope.selectedAGV = $scope.AGVData[target.data('agv-id')];
            var popup = $('body.page-visualizador-del-proceso #agv-popup');
            popup.addClass('open')
                .css('left', target.offset().left + event.target.getBoundingClientRect().width + 'px')
                .css('top', (target.offset().top - $('body.page-visualizador-del-proceso > main').offset().top) + 'px');
        });
    }

    $scope.updateAGV = function(id, action, $event) 
    {
        $($event.currentTarget).attr("disabled", true).addClass('loading');

        $http({
            method  : 'GET',
            url     : config.webservice.urls.update_agv,
            params  : {
                "id"   : id, 
                "action": action
            }
         })
        .then(function(response) {
            $rootScope.toast.content('Éxito')
                .toastClass('toast-success');
            $mdToast.show($rootScope.toast);
            $scope.deselectAllObjects();
            $($event.currentTarget).attr("disabled", false).removeClass('loading');
        });
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
            // add keys to array
            $scope.semaphoresData = {};
            for (i in response.data.get_semaphoresResult) {
                $scope.semaphoresData[response.data.get_semaphoresResult[i].Id] = response.data.get_semaphoresResult[i];
            }
        });
    }
    ArtisterilIntervalService.start($scope.loadSemaphoresData);
    // $scope.loadSemaphoresData();


    $scope.onSemaphoresRendered = function() 
    {
        $("#mapa .semaphore").on('click touchend', function(event) {
            event.stopPropagation();
            $scope.deselectAllObjects();
            var target = $(event.target);
            target.addClass('selected');

            $scope.selectedSemaphore = $scope.semaphoresData[target.data('semaphore-id')];
            var popup = $('body.page-visualizador-del-proceso #semaphore-popup');
            popup.addClass('open')
                .css('left', target.offset().left + event.target.getBoundingClientRect().width + 'px')
                .css('top', (target.offset().top - $('body.page-visualizador-del-proceso > main').offset().top) + 'px');
        });
    }

    $scope.updateSemaphore = function(id, action, $event) 
    {
        $($event.currentTarget).attr("disabled", true).addClass('loading');

        $http({
            method  : 'GET',
            url     : config.webservice.urls.update_semaphore,
            params  : {
                "id"   : id, 
                "action": action
            }
         })
        .then(function(response) {
            $rootScope.toast.content('Éxito')
                .toastClass('toast-success');
            $mdToast.show($rootScope.toast);
            $scope.deselectAllObjects();
            $($event.currentTarget).attr("disabled", false).removeClass('loading');
        });
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
            // add keys to array
            $scope.transportBeltsData = {};
            for (i in response.data.get_transport_beltsResult) {
                $scope.transportBeltsData[response.data.get_transport_beltsResult[i].Id] = response.data.get_transport_beltsResult[i];
            }
        });
    }
    ArtisterilIntervalService.start($scope.loadTransportBeltsData);
    // $scope.loadTransportBeltsData();




    $scope.onTransportBeltsRendered = function() 
    {
        $("#mapa .transport-belt").on('click touchend', function(event) {
            event.stopPropagation();
            $scope.deselectAllObjects();
            var target = $(event.target);
            target.addClass('selected');

            $scope.selectedTransportBelt = $scope.transportBeltsData[target.data('transport-belt-id')];
            var popup = $('body.page-visualizador-del-proceso #transport-belt-popup');
            popup.addClass('open')
                .css('left', target.offset().left + event.target.getBoundingClientRect().width + 'px')
                .css('top', (target.offset().top - $('body.page-visualizador-del-proceso > main').offset().top) + 'px');
        });
    }

    $scope.updateTransportBelt = function(id, action, $event) 
    {
        $($event.currentTarget).attr("disabled", true).addClass('loading');

        $http({
            method  : 'GET',
            url     : config.webservice.urls.update_transport_belt,
            params  : {
                "id"   : id, 
                "action": action
            }
         })
        .then(function(response) {
            $rootScope.toast.content('Éxito')
                .toastClass('toast-success');
            $mdToast.show($rootScope.toast);
            $scope.deselectAllObjects();
            $($event.currentTarget).attr("disabled", false).removeClass('loading');
        });
    }



	/* Storage Positions *********************************************************************************/

    // load storage positions coordinates
    $http({
        method  : 'GET',
        url     : "js/pages/visualizador-del-proceso/storage_positions_coordinates.json"
     })
    .then(function(response) {
        $scope.storagePositionsCoordinates = response.data;
    });




    $scope.openPositionPopup = function(event, id) 
    {
        event.stopPropagation();
        $scope.deselectAllObjects();
        var target = $(event.target);
        target.addClass('selected');

        $scope.selectedPositionId = id;
        var popup = $('body.page-visualizador-del-proceso #position-popup');
        popup.addClass('open')
            .css('left', target.offset().left + event.target.getBoundingClientRect().width + 'px')
            .css('top', (target.offset().top - mainPos.top) + 'px');

        $scope.loadStoragePositionNichesData(id);
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
            $scope.storagePositionNichesData = response.data.get_storage_position_nichesResult;
        });
    }




    /* AGVs status *********************************************************************************/

    $scope.AGVStatusData = [];

    $scope.loadAGVStatusData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.process_get_agvs_status
         })
        .then(function(response) {
            $scope.AGVStatusData = response.data.get_agvs_statusResult;
        });
    }
    ArtisterilIntervalService.start($scope.loadAGVStatusData, 1000);

});