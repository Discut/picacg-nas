const apiConfig = require('../configuration/ApiConfig');
module.exports = (_app) => {

    /**
     * 获取漫画列表
     */
    _app.get(apiConfig.BaseUrl + '/comic/list', (req, res) => {
        // res.send({
        //     code: 200,
        //     data: [{ name: 1 }, { name: 2 }, { name: 3 }]
        // })
        const newList = req.body
        res.send({ newList })
    })

    /**
     * 获取漫画详情
     */
    _app.get(apiConfig.BaseUrl + '/comic/info', (req, res) => {
        // res.send({
        //     code: 200,
        //     data: [{ name: 1 }, { name: 2 }, { name: 3 }]
        // })
        const newList = req.body
        res.send({ newList })
    })
    /**
     * 获取漫画封面
     */
    _app.get(apiConfig.BaseUrl + '/comic/cover', (req, res) => {
        // res.send({
        //     code: 200,
        //     data: [{ name: 1 }, { name: 2 }, { name: 3 }]
        // })
        const newList = req.body
        res.send({ newList })
    })

    /**
     * 下载指定漫画
     */
    _app.post(apiConfig.BaseUrl + '/comic/download', (req, res) => {
        // res.send({
        //     code: 200,
        //     data: [{ name: 1 }, { name: 2 }, { name: 3 }]
        // })
        const newList = req.body
        res.send({ newList })
    })

    /**
     * 超解析指定漫画
     */
    _app.post(apiConfig.BaseUrl + '/comic/download', (req, res) => {
        // res.send({
        //     code: 200,
        //     data: [{ name: 1 }, { name: 2 }, { name: 3 }]
        // })
        const newList = req.body
        res.send({ newList })
    })

    /**
     * 打包指定漫画
     */
    _app.post(apiConfig.BaseUrl + '/comic/download', (req, res) => {
        // res.send({
        //     code: 200,
        //     data: [{ name: 1 }, { name: 2 }, { name: 3 }]
        // })
        const newList = req.body
        res.send({ newList })
    })
}