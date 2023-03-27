var assert = require("assert");
const ComicCollectionDao = require("../src/dao/comicCollection");
const ComicService = require("../src/service/comicService");

describe('ComicService', function () {
    const dao = new ComicCollectionDao();
    const service = new ComicService();
    describe.skip('测试保存图片', () => {
        it('保存封面', () => {
            dao.queryAll().then(comics => {
                new ComicService()._updateComicFile([comics[0]]).then(response => {

                }).catch(err => {
                    console.error(err)
                })
            }).catch(err => {
                console.error(err)
            })
        })

    });

    describe('测试获取漫画章节', function() {
        this.timeout(5000)
        it('开始获取', (done) => {
            dao.queryAll().then(async comics => {
                await service.synchronousEpisodeInfo([comics[7]]);
                done();
            }).catch(err => {
                console.error(err)
            })
        })

    })
})