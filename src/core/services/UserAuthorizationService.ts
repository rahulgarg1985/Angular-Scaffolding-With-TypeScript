/// <reference path="../../../typings/app.d.ts" />
/// <reference path="../../../typings/tsd.d.ts" />

module Core.Services {

    export class UserAuthorizationService {

        static $inject: Array<string> = ['storageService', 'appConstant'];

        constructor(private storageService: StorageService, private appConstant: Shared.AppConstants) { }

        authorize(routePermission: Models.RoutePermission): Shared.AuthorizationResult {

            var isAuthorised: Shared.AuthorizationResult = Shared.AuthorizationResult.Unauthorised;
            
            var user: Models.LoggedInUserInfo = this.storageService.getItem(this.appConstant.keys.user,false)

            if (user == null) {
                return Shared.AuthorizationResult.LoginRequired;
            }

            if (routePermission.permissionType != null
                && routePermission.permissionType == Shared.RoutePermissionType.OnlyLoginRequired
                ) {
                return Shared.AuthorizationResult.Success;
            }


            var userRolesLowerCase = new Array<string>();
            angular.forEach(user.roles, function(role) {
                userRolesLowerCase.push(role.toLowerCase());
            });

            for (var index = 0; index < routePermission.roles.length; index++) {
                var premission = routePermission.roles[index].toLowerCase();

                if (routePermission.permissionType === Shared.RoutePermissionType.AtLeastOneRole) {
                    if (userRolesLowerCase.indexOf(premission) > -1) {
                        isAuthorised = Shared.AuthorizationResult.Success;
                        break;
                    }
                } else if (routePermission.permissionType === Shared.RoutePermissionType.AllRole) {
                    if (userRolesLowerCase.indexOf(premission) == -1) {
                        isAuthorised = Shared.AuthorizationResult.Unauthorised;
                        break;
                    }
                }
            }

            return isAuthorised;
        }

        isUserBelongToRole(role: string): boolean {
            var belongsToRole: boolean = false;
            var user: Models.LoggedInUserInfo = this.storageService.getItem(this.appConstant.keys.user,false)

            if (user != null) {
                var userRolesLowerCase: Array<string> = new Array<string>();
                angular.forEach(user.roles, function(role) {
                    userRolesLowerCase.push(role.toLowerCase());
                });
                
                role = role.toLocaleLowerCase();
                belongsToRole = userRolesLowerCase.indexOf(role) != -1;
            }
            return belongsToRole;
        }
    }

}