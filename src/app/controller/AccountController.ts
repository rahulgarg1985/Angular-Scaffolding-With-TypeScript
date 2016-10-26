/// <reference path="../../../typings/app.d.ts" />
/// <reference path="../../../typings/tsd.d.ts" />

module App.Controller {
    import Services = Core.Services;
    import Shared = Core.Shared;

    export class AccountController extends BaseController {

        password: string;
        confirmPassword: string;
        email: string;

        static $inject: Array<string> = ['baseAppService'];

        constructor(appService: Services.BaseAppService) {
            super(appService);
        }


        confirmUserEmailAndSetPassword() {
            var code = this.appService.routerService.getUrlParams('code');
            var token = this.appService.routerService.getUrlParams('token');

            this.appService.networkService.get<any>(this.appService.appConstant.appUrls.confirmEmail, {
                code: code,
                token: token,
                password: this.password
            }).then(result => {
                this.appService.toaster.success('Account activated successfully.')
                this.appService.routerService.$routeParams = null;
                this.appService.routerService.clearUrlParams();
                this.appService.routerService.routeToPage('login');
            },
                error=> {
                    this.onError(error);
                })
        }

        resetPassword() {
            var code = this.appService.routerService.getUrlParams('code');
            var token = this.appService.routerService.getUrlParams('token');

            this.appService.networkService.get<any>(this.appService.appConstant.appUrls.resetPassword, {
                code: code,
                token: token,
                password: this.password
            }).then(result => {
                this.appService.toaster.success('Password reset successfully.')
                this.appService.routerService.clearUrlParams();
                this.appService.routerService.routeToPage('login');
            },
                error=> {
                    this.onError(error);
                })
        }

        sendForgotPasswordMail() {

            this.appService.networkService.get<any>(this.appService.appConstant.appUrls.sendForgotPasswordMail, {
                email: this.email
            }).then(result => {
                this.appService.toaster.success('Kindly check your email.')
                this.appService.routerService.routeToPage('login');
            },
                error=> {
                    this.onError(error);
                })
        }

        goToLogin() {
            this.appService.routerService.clearUrlParams();
            this.appService.routerService.routeToPage('login');
        }
    }

}