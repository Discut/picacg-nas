const ComicCollectionDao = require("../src/dao/comicCollection");
var assert = require("assert");
const DownloadDao = require("../src/dao/download");
describe('dao', function () {
    describe('Create db and table', function () {
        it('Create db and table', function () {
            const dao = new ComicCollectionDao();
        });
        describe('获取行数', function () {
            it('等待获取', function () {
                const dao = new ComicCollectionDao();
                dao.count().then((value) => {
                    console.log("行数为：", value);
                })
            });
        });
        describe('删除数据', function () {
            it('开始删除', function () {
                const dao = new ComicCollectionDao();
                dao.delete('5821859c5f6b9a4f93dbf6eb').then(() => {
                }).catch(err => {
                    console.log("error", err)
                })
            });
        });
        describe('插入数据', function () {
            it('等待插入', function () {
                const dao = new ComicCollectionDao();
                dao.insert({
                    id: '5821859c5f6b9a4f93dbf6eb',
                    epsCount: 1,
                    pages: 21,
                    path: 'path',
                    fileServer: 'fileserver',
                    creator: 'creator',
                    title: 'Girls',
                    title2: 'title2',
                    author: 'author',
                    chineseTeam: 'team',
                    categories: 'cosplya',
                    tags: 'sao,usa',
                    description: 'abcd'
                }).then(() => {

                }).catch(err => {
                    console.log("error", err)
                })
            });
        });
    });
});
