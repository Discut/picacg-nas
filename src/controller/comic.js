const apiConfig = require('../configuration/ApiConfig');
const ComicService = require('../service/comicService');
module.exports = (_app) => {

    const comicService = new ComicService();

    /**
     * 同步漫画
     * @author dicut
     * 
     */
    _app.get(apiConfig.BaseUrl + '/comic/sync', (req, res) => {
        comicService.SynchronizeComic((response) => {
            res.send(response);
        });
    })

    /**
     * 获取漫画列表
     */
    _app.get(apiConfig.BaseUrl + '/comic/list', (req, res) => {
        const { page } = req.query;
        comicService.getComicsInfo(page, (response) => {
            res.send(response);
        })
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
        const { id } = req.query
        comicService.getCoverBuffer(id, buffer => {
            res.set('CONTENT-TYPE', { 'png': 'image/png', 'jpg': 'image/jpeg' });// 设置返回数据类型
            res.write(buffer);
            res.end();
        });
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