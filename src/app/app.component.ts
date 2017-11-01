import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PlaceholderPage } from '../pages/placeholder/placeholder';
import { LoginPage } from '../pages/login/login';
import { AccountProvider } from '../providers/account/account';
import { DashboardPage } from '../pages/dashboard/dashboard';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage:any = PlaceholderPage;

	constructor(
		private platform: Platform,
		private statusBar: StatusBar,
		private splashScreen: SplashScreen,
		private accountProvider: AccountProvider
	) {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
			this.accountProvider.getUser()
				.then(() => this.loadFirstPage());
		});
	}

	loadFirstPage() {
		console.log(this.accountProvider.user);
		if (!this.accountProvider.isAuthenticated) {
			console.log('load Login Page');
			this.rootPage = LoginPage;
		} else {
			this.rootPage = DashboardPage;
		}
	}
}

