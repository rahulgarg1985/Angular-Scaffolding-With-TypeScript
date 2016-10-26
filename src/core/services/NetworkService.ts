/// <reference path="../../../typings/app.d.ts" />
/// <reference path="../../../typings/tsd.d.ts" />


module Core.Services {

    export class NetworkService {
        static $inject: Array<string> = ['$http', '$log', '$q', 'appConstant', 'storageService'];

        constructor(public $http: ng.IHttpService, public $log: ng.ILogService, public $q: ng.IQService,
            public appConstant: Shared.AppConstants, public storageService: Services.StorageService) { }

        private onError(error: any): void {
            // generic handling for all error, including authorization realted stuff
            this.$log.error(error);
        }

        private getConfig(url: string, config?: ng.IRequestShortcutConfig): ng.IRequestConfig {
            var httpConfig = <ng.IRequestConfig>{};
            
            if (config != null) {
                angular.extend(httpConfig, config);
            }

            var token = this.storageService.getItem(this.appConstant.keys.token, false);
            if (token != null) {

                var tokenHeader = {
                    'Authorization': "Bearer " + token
                };

                var currentHeaders = httpConfig.headers;
                if (currentHeaders) {
                    httpConfig.headers = angular.extend(currentHeaders, tokenHeader);

                } else {
					httpConfig.headers.common["Authorization"]  = token; 
                }
            }

            httpConfig.url = url;
            return httpConfig;
        }

        private getOrDelete<T>(url: string, methodType: string, config?: ng.IRequestShortcutConfig): ng.IPromise<T> {

            var httpConfig = this.getConfig(url, config);
            httpConfig.method = methodType;
            return this.getResponse<T>(httpConfig);
        }

        private getResponse<T>(config: ng.IRequestConfig): ng.IPromise<T> {
            var deferred = this.$q.defer();

            config.headers

            this.$http(config).success(
                (result: any) => {
                    deferred.resolve(result);
                }).error((error, errorCode) => {
                    this.onError(error);
                    deferred.reject(  new Core.Models.HttpError(error,errorCode));
                });


            return deferred.promise;
        }


        get<T>(url: string, data?: any, config?: ng.IRequestShortcutConfig): ng.IPromise<T> {

            var httpConfig = this.getConfig(url, config);
            httpConfig.method = "GET";
            if (data) {
                httpConfig.params = data;
            }
            return this.getResponse(httpConfig);
        }


        delete<T>(url: string, data?: any, config?: ng.IRequestShortcutConfig): ng.IPromise<T> {

            var httpConfig = this.getConfig(url, config);
            httpConfig.method = "DELETE";
            if (data) {
                httpConfig.params = data;
            }
            return this.getResponse(httpConfig);
        }


        post<T>(url: string, data: any, config?: ng.IRequestShortcutConfig): ng.IPromise<T> {

            var httpConfig = this.getConfig(url, config);
            httpConfig.method = "POST";
            httpConfig.data = data;
            return this.getResponse<T>(httpConfig);
        }

        put<T>(url: string, data: any, config?: ng.IRequestShortcutConfig): ng.IPromise<T> {

            var httpConfig = this.getConfig(url, config);
            httpConfig.method = "PUT";
            httpConfig.data = data;
            return this.getResponse<T>(httpConfig);
        }

        patch<T>(url: string, data: any, config?: ng.IRequestShortcutConfig): ng.IPromise<T> {

            var httpConfig = this.getConfig(url, config);
            httpConfig.method = "PATCH";
            httpConfig.data = data;
            return this.getResponse<T>(httpConfig);
        }
    }
}