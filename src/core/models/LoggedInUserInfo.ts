/// <reference path="../../../typings/app.d.ts" />
/// <reference path="../../../typings/tsd.d.ts" />

module Core.Models {

    export class LoggedInUserInfo {
        constructor(
            public firstName: string, 
            public lastName: string, 
            public emailId: string,
            public roles: Array<string>
            ) { }
    }
    
      export class UserInfo {
        constructor(public username: string,
            public password:string,
            public grant_type: string = "password") { }

    }
    
}