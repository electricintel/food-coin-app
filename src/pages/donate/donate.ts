import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ToastController } from 'ionic-angular';
import { TouchID } from '@ionic-native/touch-id';

import { EathomelyProvider } from '../../providers/eathomely/eathomely';

@Component({
	selector: 'page-donate',
	templateUrl: 'donate.html',
})
export class DonatePage {
	userAccount: any = {
		items: []
	};
	store: any = {
		items: []
	};

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private eathomelyProvider: EathomelyProvider,
		public toastCtrl: ToastController,
		private zone: NgZone,
		private touchId: TouchID
	) {}

	ionViewDidLoad() {
		this.initializeUserData();
		this.initializeStore();
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
				message: `Thank you for giving ${item.title}`, 
				position: 'bottom',
				duration: 5000
			}).present();
		})
		.catch((error) => console.error(error));
	}

}
