var assert = require("assert");
const DownloadDao = require("../src/dao/download");
describe('downloadDao', function () {
    describe('创建download数据库', () => {
        it('开始创建', () => {
            const dao = new DownloadDao()
            describe('CRUD', () => {
                it('插入', () => {
                    dao.insert({
                        id: '5821859c5f6b9a4f93dbf6eb',
                        espList: [1, 2, 3],
                        downloadedEsp: [2, 3],
                        convertedEsp: [2, 3]
                    })
                })
                it('查询', () => {
                    dao.queryAll().then(rows => {
                        console.log(rows);
                    })
                })

                it('删除', ()=>{
                    dao.delete('5821859c5f6b9a4f93dbf6eb');
                })
            })
        });
    });
})