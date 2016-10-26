/// <reference path="../../../typings/app.d.ts" />
/// <reference path="../../../typings/tsd.d.ts" />


module App.Controller {
    import Services = Core.Services;
    import Shared = Core.Shared;

    export class BaseController {


        constructor(public appService: Services.BaseAppService) { }

        onError(httpError: Core.Models.HttpError) {
            // for  token specific error
            if (httpError.error.message) {
                this.appService.toaster.error(httpError.error.message);
            }
            // for any app error (array of string)
            else if (typeof httpError.error === 'object') {
                angular.forEach<string>(httpError.error, (item) => {
                    this.appService.toaster.error(item);
                })
            }
            // for any app error (single string)
            else {
                this.appService.toaster.error(httpError.error);
            }
        }
    }

}