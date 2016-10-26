/// <reference path="../../../typings/app.d.ts" />
/// <reference path="../../../typings/tsd.d.ts" />

module Core.Services {

    export class AppEventBusService {

        static $inject: Array<string> = ['$rootScope'];

        constructor(
            public $rootScope: ng.IRootScopeService) { }

        subscribe(eventName: string, callback: any): Function {
          return this.$rootScope.$on(eventName, callback);
        }

        broadcast(eventName: string, data: any): void {
            this.$rootScope.$emit(eventName, data);
        }
    }
}