var ArtisterilIntervalService = angular.module('ArtisterilIntervalService', [])
.service('ArtisterilIntervalService', function ($rootScope) 
{
    this.defaultMilliseconds = 1000;

	this.intervals = {};

    this.start = function(callback, miliseconds, name) 
    {
        if (miliseconds === undefined || !miliseconds) miliseconds = this.defaultMilliseconds;
        if (name === undefined || !name) name = 'interval_' + (Object.keys(this.intervals).length + 1);

        // call it now
        callback();

        // stop interval
        if (this.intervals[name]) {
            clearInterval(this.intervals[name]);
        }

        // start interval
        this.intervals[name] = setInterval(callback, miliseconds);
    };


    this.stop = function(name) {
        clearInterval(this.intervals[name]);
        delete this.intervals[name];
    };


    this.stopAll = function() {
        for (i in this.intervals) {
            clearInterval(this.intervals[i]);
            delete this.intervals[name];
        }
    };


});