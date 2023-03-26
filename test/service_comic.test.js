var assert = require("assert");
const ComicCollectionDao = require("../src/dao/comicCollection");
const ComicService = require("../src/service/comicService");

describe('ComicService', function () {
    describe('测试保存图片', () => {
        it('保存封面', () => {
            const dao = new ComicCollectionDao();
            dao.queryAll().then(comics => {
                new ComicService()._updateComicFile([comics[0]]).then(response => {

                }).catch(err => {
                    console.error(err)
                })
            }).catch(err => {
                console.error(err)
            })
        })

    })
})