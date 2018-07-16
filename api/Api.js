import { PixelRatio, Platform, Dimensions, StatusBar } from 'react-native';
import URI from 'urijs';

class Api {
    constructor() {
        this.serverApi = '';
        this.token = null;
        this.corpKey = null;
    }

    updateToken(token, corpKey) {
        this.token = token;
        if (corpKey) this.corpKey = corpKey;
    }

    get(url, params) {
        let uri = new URI(url);
        uri.query(params);

        console.log("corp key is" + this.corpKey);
        console.log('fetch ' + uri.toString());
        return fetch(uri.toString(), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                token: this.token,
                corpKey: this.corpKey,
            },
        });
    }

    getinit(url, params) {
      let uri = new URI(url);
      uri.query(params);

      console.log("corp key is" + this.corpKey);
      console.log('fetch ' + uri.toString());
      return fetch(uri.toString(), {
          method: 'GET',
          headers: {
              Accept: 'application/json',
              token: this.token
          },
      });
    }

    post(url, params) {
        let formData = new FormData();
        for (let k in params) {
            formData.append(k, params[k]);
        }
        console.log("corp key is" + this.corpKey);

        return fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                token: this.token,
                corpKey: this.corpKey,
            },
            body: JSON.stringify(params)
        });
    }
}

export default new Api();
