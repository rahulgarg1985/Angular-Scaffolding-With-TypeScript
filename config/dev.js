'use strict';

module.exports = {
	isProd: false,
	root: "build/dev",
	assets: {
		lib: {
			css: [
				'bower_components/bootstrap/dist/css/bootstrap.css'	,
				'bower_components/AngularJS-Toaster/toaster.css'
			],
			js: [
				'bower_components/angular/angular.js',
				'bower_components/angular-animate/angular-animate.js',
				'bower_components/angular-route/angular-route.js',
				'bower_components/AngularJS-Toaster/toaster.js',
				'bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
			]
		}
	}
};