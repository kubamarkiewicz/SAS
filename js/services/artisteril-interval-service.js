var ArtisterilIntervalService = angular.module('ArtisterilIntervalService', [])
.service('ArtisterilIntervalService', function ($rootScope) 
{
    this.defaultMilliseconds = 1000;

	this.intervals = {};

    this.start = function(callback, miliseconds, name, doNotCallNow) 
    {
        if (miliseconds === undefined || !miliseconds) miliseconds = this.defaultMilliseconds;
        if (name === undefined || !name) name = 'interval_' + (Object.keys(this.intervals).length + 1);
        if (doNotCallNow === undefined || !doNotCallNow) doNotCallNow = false;

        // call it now
        if (!doNotCallNow) {
            callback();
        }

        // stop interval
        this.stop(name);

        // start interval
        this.intervals[name] = setInterval(callback, miliseconds);
    };


    this.stop = function(name) {
        if (this.intervals[name]) {
            clearInterval(this.intervals[name]);
            delete this.intervals[name];
        }
    };


    this.stopAll = function() {
        for (name in this.intervals) {
            this.stop(name);
        }
    };


});