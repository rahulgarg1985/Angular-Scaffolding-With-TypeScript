/// <reference path="../../../typings/app.d.ts" />
/// <reference path="../../../typings/tsd.d.ts" />

module Core.Services {

    export class BaseAppService {

          static $inject: Array<string> = ['routerService', 'networkService', 'appConstant', 'toaster'];
          
        constructor(
            public routerService: Services.RouterService
            , public networkService: Services.NetworkService
            , public appConstant: Shared.AppConstants
            , public toaster: ngtoaster.IToasterService
        ) { }


    }
}