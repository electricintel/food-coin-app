import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-placeholder',
  templateUrl: 'placeholder.html',
})
export class PlaceholderPage {

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams
  	) {}

  ionViewDidLoad() {}

}
