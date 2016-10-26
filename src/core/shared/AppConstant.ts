module Core.Shared {

	export enum Role {
		Admin = 1,
		User = 2
	}

	export enum RoutePermissionType {
		AtLeastOneRole = 1,
		AllRole = 2,
		OnlyLoginRequired = 3
	}
	
	export enum AuthorizationResult {
		Success = 1,
		LoginRequired = 2,
		Unauthorised = 3
	}

	export class Appkeys {
		public user: string = "userInfo";
		public token: string = "accessToken";
	}

	export class APP_URL {
		public baseUrl: string ="http://localhost:59804/";
		public login: string = this.baseUrl + "token";
		public confirmEmail: string = this.baseUrl + "account/ConfirmEmailAndSetPassword";
		public resetPassword: string = this.baseUrl + "Password/ResetPassword";
		public sendForgotPasswordMail: string = this.baseUrl + "Password/SendForgotPasswordMail";
	}

	export class AppEvents {
		public onLoginFailed: string = "login-failed";
		public onLoginSuccess: string = "login-success";
		public onLogOut: string = "log-out";
	}


	export class AppConstants {
		static factory(): AppConstants {
			return new AppConstants();
		}
		public Role: typeof Role;
		public appName: string = "My App";
		public appVersion: number = 2;
		public appUrls: APP_URL = new APP_URL();
		public keys: Appkeys = new Appkeys();
		public addAuthorizationHeader: boolean = true;
		public isOTPEnabled: boolean = true;
		public appEvants: AppEvents = new AppEvents()
	}
}
