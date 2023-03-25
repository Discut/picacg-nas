const apiConfig = require('../configuration/ApiConfig');
module.exports = (_app) => {
    _app.post(apiConfig.BaseUrl + '/login', (req, res) => {
        // res.send({
        //     code: 200,
        //     data: [{ name: 1 }, { name: 2 }, { name: 3 }]
        // })
        const newList = req.body
        res.send({ newList })
    })

}