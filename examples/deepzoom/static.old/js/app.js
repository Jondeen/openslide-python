// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
	shim: {
        'OpenSeadragonImagingHelper': {
            deps: ['openseadragon']
        }
	},
    baseUrl: '/static/js/lib',
    paths: {
        'jquery': '/static/js/lib/jquery/jquery-1.11.1.min',
        'jquery-ui': '/static/js/lib/jquery-ui/ui',
        'knockout': '/static/js/lib/knockout/knockout-3.1.0',
        'knockout-jqueryui': '/static/js/lib/knockout-jqueryui',
        app: '/static/js/app'
    }
});

require(

    [
        'knockout',
        '/static/js/app/main.js'
    ],

    function (ko) {

        'use strict';

    }
);
