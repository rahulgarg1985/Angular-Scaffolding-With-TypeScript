/// <reference path="../../../typings/app.d.ts" />
/// <reference path="../../../typings/tsd.d.ts" />

module App.Controller {
    import Services = Core.Services;
    import Shared = Core.Shared;

    export class LoginController extends BaseController {

        public loginInfo: App.Model.LoginModel;

        static $inject: Array<string> = ['baseAppService', 'userAuthorizationService','storageService', 'eventService', ];

        constructor(
            appService: Services.BaseAppService
            ,public userAuthorizationService: Services.UserAuthorizationService,
            public storageService: Services.StorageService,
            public eventService: Services.AppEventBusService) {

            super(appService);
            this.loginInfo = new App.Model.LoginModel();
        }


        login() {
            var httpConfig = <ng.IRequestShortcutConfig>{};
            httpConfig.headers = { "Content-Type": 'application/x-www-form-urlencoded' };
            var user = new Core.Models.UserInfo(this.loginInfo.userName, this.loginInfo.password);
            var $j: any = jQuery.noConflict();

            this.appService.networkService.$http.post<any>(this.appService.appConstant.appUrls.login, $j.param(user), httpConfig)
                .then(result => {
                    var token = result.data.access_token;
                    var user = JSON.parse(result.data.user);
                    var userInfo: Core.Models.LoggedInUserInfo = new Core.Models.LoggedInUserInfo(user.FirstName, user.LastName, user.EmailId, user.Roles);

                    this.storageService.setItem(this.appService.appConstant.keys.user, userInfo, false);
                    this.storageService.setItem(this.appService.appConstant.keys.token, token, false);

                    this.eventService.broadcast(this.appService.appConstant.appEvants.onLoginSuccess, userInfo);

                    if (this.userAuthorizationService.isUserBelongToRole("Admin")) {
                        this.appService.routerService.routeToPage("admin");
                    }
                    else {
                        this.appService.routerService.routeToPage("error");
                    }
                },
                error=> {
                    console.log(error.data.error_description);
                    this.appService.toaster.error(error.data.error_description);
                    this.eventService.broadcast(this.appService.appConstant.appEvants.onLoginFailed, error.data.error_description);
                })
        }


        logOut(): void {
            this.storageService.clearAll(false);
            this.eventService.broadcast(this.appService.appConstant.appEvants.onLogOut, "User logged out.");
        }

        goToForgotPassword() {
            this.appService.routerService.routeToPage('forgotPassword');
        }
    }

}