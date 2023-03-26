const { DATABASE_NAME } = require("../configuration/dbConfig");
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

module.exports = class DaoBase {
    _databasePath = '';
    _exist = false;
    _db = null;
    constructor(databaseName) {
        this.checkDatabase(databaseName || DATABASE_NAME)
    }
    checkDatabase(name) {
        this._databasePath = path.join(process.cwd(), 'db', name);
        // 判断数据库文件是否存在
        this._exist = fs.existsSync(this._databasePath);
        if (!fs.existsSync(path.join(process.cwd(), 'db'))) {
            fs.mkdirSync(path.join(process.cwd(), 'db'));
        }
        if (!this._exist) {
            fs.openSync(this._databasePath, 'w');
            fs.close(0);
            console.log('Create database![' + name + ']');
        }
        this._db = new sqlite3.Database(this._databasePath);
    }
    checkTable(sql, tableName) {
        return new Promise(() => {
            const _db = this._db.all("SELECT COUNT(*) FROM sqlite_master where type ='table' and name ='" + tableName + "'", function (err, rows) {
                if (rows[0]['COUNT(*)'] == 0) {
                    _db.run(sql);
                }
            });
        });
    }
}