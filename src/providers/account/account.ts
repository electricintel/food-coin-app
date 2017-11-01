import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class AccountProvider {
	user: any = {};

	constructor(
		public http: Http,
		private nativeStorage: NativeStorage
	) {}

	getUser() {
		return this.nativeStorage.getItem('user')
			.then((user) => { this.user = user; console.log(user); return user; });
	}

	setUser(value) {
		return this.nativeStorage.setItem('user', value)
			.then(() => this.getUser());
	}

	get isAuthenticated() {
		return !!this.user.id;
	}
}
