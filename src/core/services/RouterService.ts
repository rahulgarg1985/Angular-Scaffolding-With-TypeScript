/// <reference path="../../../typings/app.d.ts" />
/// <reference path="../../../typings/tsd.d.ts" />

module Core.Services {

	export class RouterService {

		static $inject: Array<string> = ['$location', '$routeParams'];

		constructor(public $location: ng.ILocationService,public $routeParams: any) {

		}

		routeToPage(pageName: string): void {
			pageName = '/' + pageName;
			this.$location.path(pageName);
		}

		getUrlParams(paramName: string): any {
			return this.$routeParams[paramName];
		}
		
		clearUrlParams(){
			this.$location.search('');
		}
	}

}