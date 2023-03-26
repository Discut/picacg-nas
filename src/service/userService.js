const { PicaComicAPI } = require("@l2studio/picacomic-api");
const AccountDao = require("../dao/account");

module.exports = class UserService {
    constructor() {

    }

    login(account, password, callback) {
        const api = new PicaComicAPI({
            proxy: {
                host: '127.0.0.1',
                port: '7890'
            }
        });
        api.signIn({
            email: account,
            password
        }).then(res => {
            if (res != undefined && res != null) {
                const dao = new AccountDao();
                dao.insert({
                    email: account, password, key: res
                });
                dao.switchActivity(account, true);
                callback({
                    code: 200,
                    msg: '获取成功'
                });
            }
        }).catch(err => {
            console.log(err)
            callback({
                code: 500,
                msg: '获取失败'
            })
        })
    }
}