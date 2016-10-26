/// <reference path="../../../typings/app.d.ts" />
/// <reference path="../../../typings/tsd.d.ts" />

module Core.Models {

    export class HttpError {
        constructor(
            public error: any, 
            public errorCode: number
            ) { }
    }
       
}