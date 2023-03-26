const apiConfig = require('../configuration/ApiConfig');
const UserService = require('../service/userService');
module.exports = (_app) => {
    const userServer = new UserService();
    _app.post(apiConfig.BaseUrl + '/login', (req, res) => {
        const { account, password } = req.body;
        if (account != undefined && password != undefined && account != '' && password != '') {
            userServer.login(account, password, (msg) => {
                res.send(msg);
            })
        } else {
            res.sed({
                code: 500,
                msg: '请检查'
            })
        }

    })

}