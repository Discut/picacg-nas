const { EPISODE_TABLE_NAME, COMIC_COLLECTION_TABLE_NAME } = require("../configuration/dbConfig");
const DaoBase = require("./base");

module.exports = class EpisodeDao extends DaoBase {
    constructor() {
        super();
        this.checkTable(
            'CREATE TABLE ' + EPISODE_TABLE_NAME + ' (' +
            'id varchar,' +
            ' epsId varchar,' +
            ' epsTitle varchar,' +
            ' "epsOrder" int,' +
            'PRIMARY KEY(epsId, id),' +
            'FOREIGN KEY(id) REFERENCES ' + COMIC_COLLECTION_TABLE_NAME + '(id) ' +
            ');',
            EPISODE_TABLE_NAME);

    }

    async insert(episode) {
        this._db.all('INSERT INTO ' + EPISODE_TABLE_NAME + ' (id,"epsId","epsTitle","epsOrder") VALUES(?,?,?,?);', [episode.id, episode.epsId, episode.epsTitle, episode.epsOrder]);
    }

    async deleteByBookId(id) {
        this._db.all('DELETE FROM ' + EPISODE_TABLE_NAME + ' WHERE id=?;', [id]);
    }
    async deleteByEpsId(id) {
        this._db.all('DELETE FROM ' + EPISODE_TABLE_NAME + ' WHERE epsId=?;', [id]);
    }

    queryByBookId(id) {
        return new Promise((resolve, reject) => {
            this._db.all('SELECT * FROM ' + EPISODE_TABLE_NAME + ' WHERE id=?;', [id], (error, rows) => {
                console.log(id)
                resolve(rows);
            })
        });
    }
    queryByBookIdAndOrder(id, order) {
        return new Promise((resolve, reject) => {
            this._db.all('SELECT * FROM ' + EPISODE_TABLE_NAME + ' WHERE id=? AND "epsOrder"=?;', [id, order], (error, rows) => {
                resolve(rows);
            })
        });
    }
}