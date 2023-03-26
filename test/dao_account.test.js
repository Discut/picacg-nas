var assert = require("assert");
const AccountDao = require("../src/dao/account");
describe('AccountDao', function () {
    describe('创建download数据库', () => {
        it('开始创建', () => {
            const dao = new AccountDao()
            describe('CRUD', () => {
                it('插入', () => {
                    dao.insert({
                        email: 'miku_is_emm',
                        password: '1234321',
                        key: '令牌'
                    })
                })
                it('更新', () => {
                    dao.updateKey('miku_is_emm', 'key');
                });
                it('更新isActivity', () => {
                    dao.switchActivity('miku_is_emm', true);
                });
                it('查询', () => {
                    dao.queryAll().then(rows => {
                        console.log(rows);
                    })
                })
                it('删除', () => {
                    dao.delete('miku_is_emm');
                })
            })
        });
    });
})