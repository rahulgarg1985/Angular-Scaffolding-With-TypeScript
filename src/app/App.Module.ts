/// <reference path="../../typings/app.d.ts" />
/// <reference path="../../typings/tsd.d.ts" />

module App {
    'use strict';
    ((): void => {

        var dependencies = ['app.core', 'ngRoute', 'toaster', 'ngAnimate', 'ui.bootstrap'];

              angular.module('app', dependencies)
            .controller('accountController', App.Controller.AccountController)
            .controller('loginController', App.Controller.LoginController)
            .directive("compareTo", Directive.CompareTo.factory)
            .config(App.RouteConfig);
    })();
}