var assert = require("assert");
const EpisodeDao = require("../src/dao/episode");
describe('EpisodeDao', function () {
    describe('创建Episode数据库', () => {
        it('开始创建', () => {
            const dao = new EpisodeDao()
            describe('CRUD', () => {
                // it('插入', () => {
                //     dao.insert({
                //         id: '5821859c5f6b9a4f93dbf6eb',
                //         epsId: '123123',
                //         epsTitle: '[2, 3]',
                //         epsOrder: 2
                //     })
                // })
                it('查询', (done) => {
                    dao.queryByBookId('5c945871842bed29b5c197ac').then(rows => {
                        console.log(rows);
                        done()
                    });
                    // dao.queryAll().then(rows => {
                    //     console.log(rows);
                    // })
                })

                it('删除', () => {
                    //dao.delete('5821859c5f6b9a4f93dbf6eb');
                })
            })
        });
    });
})