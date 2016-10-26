/// <reference path="../../../typings/app.d.ts" />
/// <reference path="../../../typings/tsd.d.ts" />

module Core.Models {

    export class RoutePermission {

        static factory(roles: Array<string>, permissionType: Shared.RoutePermissionType): RoutePermission {
            return new RoutePermission(roles, permissionType);
        }

        constructor(public roles: Array<string>,
            public permissionType: Shared.RoutePermissionType
            ) { }
    }
}