/// <reference path="../../../typings/app.d.ts" />
/// <reference path="../../../typings/tsd.d.ts" />

module Core.Services {

        export class RouteAuthorizationService {

                static $inject: Array<string> = ['$rootScope', 'routerService', 'userAuthorizationService'];

                constructor(private $rootScope: ng.IRootScopeService,
                        private routerService: RouterService,
                        private authService: UserAuthorizationService) {

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

                }
        }
}

