const { PicaComicService } = require("@l2studio/picacomic-api");
const AccountDao = require("../dao/account");
const fs = require('fs');
const path = require('path');
const { DOWNLOAD_DIR } = require("../configuration/systemConfig");

exports.getPicacgService = () => {
    return new Promise((resolve, reject) => {
        const accountDao = new AccountDao();
        accountDao.queryActivityAccount().then(rows => {
            if (rows.length > 0) {
                const result = new PicaComicService({
                    email: rows[0].email,
                    password: rows[0].password,
                    token: rows[0].key,
                    proxy: {
                        host: '127.0.0.1',
                        port: 7890
                    },
                    onReauthorizationToken(token) {
                        accountDao.updateKey(rows[0].email, token);
                    }
                });
                resolve(result);
            }

        }).catch(err => {
            console.error(err);
        })
    })
}