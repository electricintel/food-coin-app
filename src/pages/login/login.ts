import { Component, NgZone } from '@angular/core';
import { NavController, App } from 'ionic-angular';

import { ToastController } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { QRScanner } from '@ionic-native/qr-scanner';
import { Vibration } from '@ionic-native/vibration';

import { MyApp } from '../../app/app.component';

import { AccountProvider } from '../../providers/account/account';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {
	scanSubscription: any = null;

	passwordModel: any = {
		visible: false,
		password: ''
	};

	constructor(
		public navCtrl: NavController,
		public toastCtrl: ToastController,
		private zone: NgZone,
		private diagnostic: Diagnostic,
		private qrScanner: QRScanner,
		private vibration: Vibration,
		public appCtrl: App,
		private accountProvider: AccountProvider
	) {}

	ionViewDidLoad() {
		this.checkCameraPermissions()
			.then(() => this.initializeQRCameraPreview())
			.catch((errorMessage) => {
				this.toastCtrl.create({
					message: errorMessage, 
					position: 'bottom',
					duration: 5000
				}).present()
			});
	}

	ionViewWillLeave() {
		if (this.scanSubscription) {
			this.qrScanner.hide();
			this.scanSubscription.unsubscribe();
			this.scanSubscription = null;
		}
	}
	 
	checkCameraPermissions(): Promise<any> {
		return this.diagnostic.isCameraAuthorized().then((authorized) => {
			if (authorized) { return; }

			return this.diagnostic.requestCameraAuthorization().then((status) => {
				if (status !== this.diagnostic.permissionStatus.GRANTED) {
					return Promise.reject('Cannot access camera');
				}
			});
		});
	}

	initializeQRCameraPreview() {
		this.scanSubscription = this.qrScanner.scan().subscribe((text: string) => this.onQRCodeScan(text));
		this.qrScanner.show();
		this.qrScanner.resumePreview();
	}

	onQRCodeScan(text: string) {
		this.zone.run(() => {
			this.passwordModel.visible = true;
		});
		this.vibration.vibrate(1000);

		this.qrScanner.pausePreview();
		this.scanSubscription.unsubscribe();
		this.scanSubscription = null;
	}

	login() {
		this.accountProvider.setUser({
			id: '123',
			name: 'Muhammad Dadu'
		}).then(() => {
			this.appCtrl.getRootNav().setRoot(MyApp);
			window.location.reload();
		});
	}
}
