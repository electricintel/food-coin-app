import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
	selector: 'page-redeem',
	templateUrl: 'redeem.html',
})
export class RedeemPage {
	item: any = {};

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams
	) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad RedeemPage');
		this.item = this.navParams.data;
	}
}
