/// <reference path="../../typings/app.d.ts" />
/// <reference path="../../typings/tsd.d.ts" />


module Core {
      'use strict';
      ((): void => {

            var core = angular.module('app.core', [])
                  .constant('appConstant', Core.Shared.AppConstants.factory())
                  .service('networkService', Core.Services.NetworkService)
                  .service('routerService', Core.Services.RouterService)
                  .service('storageService', Core.Services.StorageService)
                  .service('baseAppService', Core.Services.BaseAppService)
                  .service('viewService', Core.Services.ViewService)
                  .service('userAuthorizationService', Core.Services.UserAuthorizationService)
                  .service('eventService', Core.Services.AppEventBusService)
                  .service('routeAuthorizationService', Core.Services.RouteAuthorizationService)
                  .run(['$rootScope', 'routerService', 'userAuthorizationService',
                        function($rootScope,routerService,authService) {
                              console.log('init');
                               $rootScope.$on('$routeChangeStart', function(event: ng.IAngularEvent, next, current) {
                                if (next.routePermission) {
                                        var result: Shared.AuthorizationResult = authService.authorize(next.routePermission);

                                        if (result === Shared.AuthorizationResult.Unauthorised) {
                                                routerService.routeToPage('unauthorised');
                                        }
                                        if (result === Shared.AuthorizationResult.LoginRequired) {
                                                routerService.routeToPage('login');
                                        }
                                }
                        })
                        }]);
                  
      })();
}