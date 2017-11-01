import { Component, NgZone } from '@angular/core';
import { NavController, App } from 'ionic-angular';

import { Shake } from '@ionic-native/shake';
import { ToastController } from 'ionic-angular';
import { QRScanner } from '@ionic-native/qr-scanner';
import { Vibration } from '@ionic-native/vibration';

import { MyApp } from '../../app/app.component';

import { AccountProvider } from '../../providers/account/account';

@Component({
	selector: 'page-dashboard',
	templateUrl: 'dashboard.html',
})
export class DashboardPage {
	shakeWatcher: any;
	scanSubscription: any = null;

	constructor(
		public navCtrl: NavController,
		private accountProvider: AccountProvider,
		public appCtrl: App,
		private shake: Shake,
		public toastCtrl: ToastController,
		private qrScanner: QRScanner,
		private vibration: Vibration,
		private zone: NgZone
	) {}

	ionViewDidLoad() {
		this.setupShakeToLogout();
		this.initializeQRCameraPreview();
	}

	ionViewWillLeave() {
		if (this.shakeWatcher) {
			this.shakeWatcher.unsubscribe();
		}

		if (this.scanSubscription) {
			this.qrScanner.hide();
			this.scanSubscription.unsubscribe();
			this.scanSubscription = null;
		}
	}

	setupShakeToLogout() {
		this.toastCtrl.create({
			message: 'Shake to logout', 
			position: 'bottom',
			duration: 5000
		}).present();

		this.shakeWatcher = this.shake.startWatch(60).subscribe(() => {
			this.logout();
		});
	}

	logout() {
		this.accountProvider.setUser({}).then(() => {
			this.appCtrl.getRootNav().setRoot(MyApp);
			window.location.reload();
		});
	}

	initializeQRCameraPreview() {
		this.scanSubscription = this.qrScanner.scan().subscribe((text: string) => this.onQRCodeScan(text));
		this.qrScanner.show();
		this.qrScanner.resumePreview();
	}

	onQRCodeScan(text: string) {
		// this.zone.run(() => {
		// 	this.passwordModel.visible = true;
		// });
		this.vibration.vibrate(1000);

		// this.qrScanner.pausePreview();
		// this.scanSubscription.unsubscribe();
		// this.scanSubscription = null;
	}
}
