import Api from './Api';
import { API_URL } from 'react-native-dotenv';

class Service {
    constructor() {
        this.accessToken = null;
        this.user = null;
        this.corpId = null;
        this.ctx = null;
    }

    updateAccessToken(token) {
        this.accessToken = token;
        Api.updateToken(this.accessToken, this.corpId);
    }

    getAccessToken() {
      return this.accessToken;
    }

    validate(request) {
        return request.then(resp => resp.json()).then(resp => {
            if (resp.errmsg === 'ok') {
                return resp;
            } else {
                console.warn(resp);
                this.ctx && this.ctx.props.navigation.navigate('Auth');
                return Promise.reject(resp);
            }
        }).catch(err => {
            console.warn(err);
        });
    }

    selectCorp(corpId) {
        this.corpId = corpId;
        Api.updateToken(this.accessToken, this.corpId);
    }

    login(account, password) {
        // 18664357830 123456
        return this.validate(Api.post(`${API_URL}/api/sso/auth/login`, { account: account, password: password }))
            .then(resp => {
                this.accessToken = resp.data.access_token;
                Api.updateToken(this.accessToken);
                console.log(resp);
                return resp.data;
            });
    }

    getCorpList() {
        return this.validate(Api.getinit(`${API_URL}/api/corp/oa/user/corp/simplelist`))
            .then(resp => {
                return resp.data;
            });
    }

    getUserInfo(forceRefresh) {
        if (forceRefresh || ! this.user) {
            return this.validate(Api.get(`${API_URL}/api/corp/oa/user/me`))
                .then(resp => {
                    this.user = resp.data;
                    return resp.data;
                });
        } else {
            return Promise.resolve(this.user);
        }
    }

    getUserBook(option = {}) {
        let { pageNo } = option;
        pageNo = pageNo ? pageNo : '';
        return this.validate(Api.get(`${API_URL}/api/corp/oa/user/department/simplelist?pageSize=15&pageNo=${pageNo}`))
            .then(resp => {
                return resp.data;
            });
    }

    getMicroAppList() {
        return this.validate(Api.get(`${API_URL}/api/corp/oa/microapp/list`))
            .then(resp => {
                console.log(resp);
                return resp.data;
            });
    }

    getDepartmentList() {
        return this.validate(Api.get(`${API_URL}/api/corp/oa/department/list`))
            .then(resp => {
              console.log(resp);
              if(resp.errcode === "40000") {
                return resp.data;
              } else {
                return Promise.reject(resp.errmsg);
              }
            })
    }

    getDepartPList(dID, total) {
        return this.validate(Api.get(`${API_URL}/api/corp/oa/user/department/simplelist?departmentId=${dID}&pageSize=${total}`))
          .then(resp => {
            console.log(resp);
            if(resp.errcode === "40000") {
              return resp.data;
            } else {
              return Promise.reject(resp.errmsg);
            }
          })
    }

    bindCTX(ctx) {
      this.ctx = ctx;
      console.log(ctx);
    }
}

export default new Service();
