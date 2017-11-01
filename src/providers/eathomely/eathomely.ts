import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';

const BASE_URL = 'https://preprod.eathomely.com/api';

@Injectable()
export class EathomelyProvider {
	cache: any = {};

	constructor(public http: HTTP) {}

	getItems() {
		if (this.cache['getItems']) {
			return Promise.resolve(this.cache['getItems'])
		}

		return this.http
			.get(`${BASE_URL}/customer/products/in/e11pa`, {}, {})
			.then((response) => {
				let data = JSON.parse(response.data).data;
				this.cache['getItems'] = data.products;
				return this.cache['getItems'];
			});
	}

}
