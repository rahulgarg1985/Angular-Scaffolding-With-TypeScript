/// <reference path="../../../typings/app.d.ts" />
/// <reference path="../../../typings/tsd.d.ts" />

module App.Directive {

   export class CompareTo implements ng.IDirective {

        require: any = "ngModel";
        scope: any = {
            otherModelValue: "=compareTo"
        };

        link: ng.IDirectiveLinkFn = function(scope, element, attributes, ngModel: any) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }

        constructor() { }

        static factory(): ng.IDirective {
            var directive = () => {
                return new CompareTo();
            }
            directive['$inject'] = [''];
            return directive();
        }
    }
}

