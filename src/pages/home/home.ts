import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ToastController } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { QRScanner } from '@ionic-native/qr-scanner';
import { Vibration } from '@ionic-native/vibration';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	scanSubscription: any = null;
	account = {
		qrCode: 'dsa',
		password: '',
	};

	constructor(
		public navCtrl: NavController,
        public toastCtrl: ToastController,
		private diagnostic: Diagnostic,
		private qrScanner: QRScanner,
		private vibration: Vibration
	) {
	}

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
		    if (authorized) {
		        return;
		    }

	        return this.diagnostic.requestCameraAuthorization().then((status) => {
	            if (status !== this.diagnostic.permissionStatus.GRANTED) {
	                return Promise.reject('Cannot access camera');
	            }
	        });
        });
	}

	initializeQRCameraPreview() {
		this.scanSubscription = this.qrScanner.scan().subscribe((text: string) => {
			this.account.qrCode = text;
			this.vibration.vibrate(1000);

			this.qrScanner.pausePreview();
			this.scanSubscription.unsubscribe();
			this.scanSubscription = null;
		});

		// show camera preview
		this.qrScanner.show();
	}
}
