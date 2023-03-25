const { COMIC_COLLECTION_DATABASE_NAME, COMIC_COLLECTION_TABLE_NAME } = require('../configuration/dbConfig');
const DaoBase = require('./base');


const sqlite3 = require('sqlite3').verbose();

module.exports = class ComicCollectionDao extends DaoBase {
    constructor() {
        super();
        this.checkTable(
            'CREATE TABLE ' + COMIC_COLLECTION_TABLE_NAME + ' (id varchar PRIMARY KEY UNIQUE, epsCount int, pages int, path varchar, fileServer varchar, creator varchar, title varchar, title2 varchar, author varchar, chineseTeam varchar, categories varchar, tags varchar, description varchar)',
            COMIC_COLLECTION_TABLE_NAME);
    }

    /**
     * 获取 comic 表行数
     * @author discut
     * @returns Promise 行数
     */
    count() {
        const _db = this._db;
        return new Promise(function (resolve, reject) {
            _db.all("SELECT COUNT(*) FROM " + COMIC_COLLECTION_TABLE_NAME, function (err, rows) {
                resolve(rows[0]['COUNT(*)']);
            });
        });
    }

    /**
     * 插入漫画
     * @author discut
     * @param {Comic} comic 漫画数据 
     * @returns 
     */
    insert(comic) {
        return new Promise((resolve, reject) => {
            console.log([comic])
            comic = {
                $id: comic.id,
                $epsCount: comic.epsCount,
                $pages: comic.pages,
                $path: comic.path,
                $fileServer: comic.fileServer,
                $creator: comic.creator,
                $title: comic.title,
                $title2: comic.title2,
                $author: comic.author,
                $chineseTeam: comic.chineseTeam,
                $categories: comic.categories,
                $tags: comic.tags,
                $description: comic.description
            }
            this._db.all("insert into " + COMIC_COLLECTION_TABLE_NAME + "(id,'epsCount',pages,path,'fileServer',creator,title,title2,author,'chineseTeam',categories,tags,description)values($id,$epsCount,$pages,$path,$fileServer,$creator,$title,$title2,$author,$chineseTeam,$categories,$tags,$description)", comic);
        });
    }

    /**
     * 查询所有数据
     * @author discut
     * @returns 
     */
    queryAll() {
        return new Promise((resolve, reject) => {
            this._db.all('SELECT * FROM ' + COMIC_COLLECTION_TABLE_NAME, function (err, rows) {
                resolve(rows);
            });
        });
    }

    
    query(id) {

    }

}