const { DOWNLOAD_DATABASE_NAME, COMIC_DOWNLOAD_TABLE_NAME } = require('../configuration/dbConfig');
const DaoBase = require('./base');


const sqlite3 = require('sqlite3').verbose();

module.exports = class DownloadDao extends DaoBase {
    constructor() {
        super(DOWNLOAD_DATABASE_NAME);
        this.checkTable(
            'CREATE TABLE ' + COMIC_DOWNLOAD_TABLE_NAME + ' (' +
            'id varchar PRIMARY KEY,' +
            ' espList varchar,' +
            ' downloadedEsp varchar,' +
            ' convertedEsp varchar' +
            ')',
            COMIC_DOWNLOAD_TABLE_NAME);
    }

    /**
     * 查询所有数据
     * @author discut
     * @returns 
     */
    queryAll() {
        return new Promise((resolve, reject) => {
            this._db.all('SELECT * FROM ' + COMIC_DOWNLOAD_TABLE_NAME, function (err, rows) {
                resolve(rows);
            });
        });
    }

    /**
     * 插入下载漫画
     * @author discut
     * @param {Comic} comic 漫画数据 
     * @returns 
     */
    insert(comic) {
        return new Promise((resolve, reject) => {
            comic = {
                $id: comic.id,
                $espList: JSON.stringify(comic.espList),
                $downloadedEsp: JSON.stringify(comic.downloadedEsp),
                $convertedEsp: JSON.stringify(comic.convertedEsp),
            }
            this._db.all("insert into " + COMIC_DOWNLOAD_TABLE_NAME + " (id,'espList','downloadedEsp','convertedEsp')values($id,$espList,$downloadedEsp,$convertedEsp)", comic);
        });
    }

    /**
     * 删除
     * @param {String} id 
     * @returns 
     */
    delete(id) {
        return new Promise((resolve, reject) => {
            this._db.all('DELETE FROM ' + COMIC_DOWNLOAD_TABLE_NAME + ' WHERE id=?', [id]);
        });
    }

}