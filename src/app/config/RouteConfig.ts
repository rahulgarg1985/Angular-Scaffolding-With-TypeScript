/// <reference path="../../../typings/app.d.ts" />
/// <reference path="../../../typings/tsd.d.ts" />


module App {
    
    /***********************************************************************************************************************
    IMPORTANT : You need to add  routePermission? : Core.Models.RoutePermission; in  interface IRoute of angular-route.d.ts   
    ************************************************************************************************************************/
    export class RouteConfig {

        static $inject: Array<string> = ['$routeProvider', '$locationProvider'];

        constructor(private $routeProvider: ng.route.IRouteProvider, private $locationProvider: ng.ILocationProvider) {

            this.$routeProvider
                .when('/', {
                    controller: "loginController",
                    controllerAs: "vm",
                    templateUrl: "template/login.html"
                })
                .when('/login', {
                    controller: "loginController",
                    controllerAs: "vm",
                    templateUrl: "template/login.html"
                })
                  .when('/admin', {
                   /* We can provide role for particular route and no need to check any where else. Framework will automatically check logged in user roles*/
                    controller: "adminController",
                    controllerAs: "vm",
                    templateUrl: "template/userList.html",
                    routePermission: Core.Models.RoutePermission.factory(["Admin"], Core.Shared.RoutePermissionType.AtLeastOneRole)
                })
                .when('/resetPassword', {
                    controller: "accountController",
                    controllerAs: "vm",
                    templateUrl: 'template/resetPassword.html'
                })
                .when('/forgotPassword', {
                    controller: "accountController",
                    controllerAs: "vm",
                    templateUrl: 'template/forgotPassword.html'
                })
                .when('/confirmEmail', {
                    controller: "accountController",
                    controllerAs: "vm",
                    templateUrl: 'template/activateAccount.html'
                })
                .when('/unauthorised', {
                    templateUrl: "template/unauthorised.html"
                })
                .when('/error', {
                    templateUrl: "template/error.html"
                })
                .otherwise({ redirectTo: "login" })


            this.$locationProvider.html5Mode({
                enabled: false,
                requireBase: false
            });

        }
    }

}