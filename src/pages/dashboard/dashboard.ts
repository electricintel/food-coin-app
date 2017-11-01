import { Component, NgZone } from '@angular/core';
import { NavController, App } from 'ionic-angular';

import { Shake } from '@ionic-native/shake';
import { ToastController } from 'ionic-angular';
import { QRScanner } from '@ionic-native/qr-scanner';
import { Vibration } from '@ionic-native/vibration';
import { TouchID } from '@ionic-native/touch-id';

import { MyApp } from '../../app/app.component';

import { AccountProvider } from '../../providers/account/account';
import { EathomelyProvider } from '../../providers/eathomely/eathomely';

import { RedeemPage } from '../redeem/redeem';
import { DonatePage } from '../donate/donate';

@Component({
	selector: 'page-dashboard',
	templateUrl: 'dashboard.html',
})
export class DashboardPage {
	shakeWatcher: any;
	scanSubscription: any = null;
	userAccount: any = {
		items: []
	};
	store: any = {
		items: []
	};

	constructor(
		public navCtrl: NavController,
		public appCtrl: App,
		public toastCtrl: ToastController,
		private accountProvider: AccountProvider,
		private eathomelyProvider: EathomelyProvider,
		private shake: Shake,
		private qrScanner: QRScanner,
		private vibration: Vibration,
		private zone: NgZone,
		private touchId: TouchID
	) {}

	ionViewDidLoad() {
		this.initializeUserData();
		this.initializeStore();
	}

	ionViewWillEnter() {
		this.initializeQRCameraPreview();
	}

	ionViewWillLeave() {
		if (this.shakeWatcher) {
			this.shakeWatcher.unsubscribe();
		}

		if (this.scanSubscription) {
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
		this.vibration.vibrate(1000);

		this.navCtrl.push(DonatePage, {
			id: text
		});
	}

	initializeStore() {
		this.eathomelyProvider.getItems().then((products) => {
			products.forEach((item) => {
				let images = JSON.parse(item.images);
				this.store.items.push({
					provider: 'eathomely',
					id: item.id,
					title: item.name,
					image: images[0].secure_url,
					description: item.description,
					price: '4.00'
				});
			})
		});
	}

	initializeUserData() {
	}

	purchase(item) {
		this.touchId.isAvailable()
		.then(() => this.touchId.verifyFingerprint(`Confirm your purchase for ${item.title}`))
		.catch((error) => {
			if (error.code === -128) {
				return Promise.reject('');
			}
			Promise.resolve();
		})
		.then(() => {
			this.zone.run(() => {
				this.userAccount.items.push(item);
			});

			this.toastCtrl.create({
				message: `Thank you for purchasing ${item.title}`, 
				position: 'bottom',
				duration: 5000
			}).present();
		})
		.catch((error) => console.error(error));
	}

	redeem(item) {
		this.navCtrl.push(RedeemPage, item);
	}
}
