'use strict';

module.exports = {
	isProd: true,
	root: "build/prod",
	assets: {
		lib: {
			css: [
				'bower_components/bootstrap/dist/css/bootstrap.min.css',
				'bower_components/AngularJS-Toaster/toaster.min.css',
			],
			js: [
				'bower_components/angular/angular.min.js',
				'bower_components/angular-animate/angular-animate.min.js',
				'bower_components/angular-route/angular-route.min.js',
				'bower_components/AngularJS-Toaster/toaster.min.js',
				'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',

				'bower_components/angular/angular.min.js.map',
				'bower_components/angular-animate/angular-animate.min.js.map',
				'bower_components/angular-route/angular-route.min.js.map',
				'bower_components/AngularJS-Toaster/toaster.min.js.map'

			]
		}
	}
};