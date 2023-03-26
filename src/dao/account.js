const { ACCOUNT_TABLE_NAME, ACCOUNT_DATABASE_NAME } = require('../configuration/dbConfig');
const DaoBase = require('./base');

const sqlite3 = require('sqlite3').verbose();

module.exports = class AccountDao extends DaoBase {
    constructor() {
        super(ACCOUNT_DATABASE_NAME);
        this.checkTable(
            'CREATE TABLE ' + ACCOUNT_TABLE_NAME + ' (email varchar, password varchar, key varchar, isActivity int default(0))',
            ACCOUNT_TABLE_NAME);
    }

    queryAll() {
        return new Promise((resolve, reject) => {
            this._db.all('SELECT * FROM ' + ACCOUNT_TABLE_NAME + ';', (err, rows) => {
                resolve(rows);
            });
        });
    }
    query(email) {
        return new Promise((resolve, reject) => {
            this._db.all('SELECT * FROM ' + ACCOUNT_TABLE_NAME + ' WHERE email=?', [email], (err, rows) => {
                resolve(rows);
            });
        });
    }

    queryActivityAccount() {
        return new Promise((resolve, reject) => {
            this._db.all('SELECT * FROM ' + ACCOUNT_TABLE_NAME + ' WHERE isActivity=1;', (err, rows) => {
                resolve(rows);
            });
        });
    }

    insert(account) {
        account = {
            $email: account.email,
            $password: account.password,
            $key: account.key
        };
        this._db.all('insert into ' + ACCOUNT_TABLE_NAME + '(email,password,"key")values($email,$password,$key);', account);
    }

    switchActivity(email, isActivity) {
        this._db.all('UPDATE ' + ACCOUNT_TABLE_NAME + ' SET "isActivity"=? WHERE email=?', [isActivity ? 1 : 0, email]);
    }

    delete(email) {
        this._db.all('DELETE FROM ' + ACCOUNT_TABLE_NAME + ' WHERE email=?', [email]);
    }

    updateKey(email, key) {
        this._db.all('UPDATE ' + ACCOUNT_TABLE_NAME + ' SET "key"=? WHERE email=?', [key, email]);
    }
}