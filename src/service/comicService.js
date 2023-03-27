const { DOWNLOAD_DIR } = require("../configuration/systemConfig");
const ComicCollectionDao = require("../dao/comicCollection");
const { getPicacgService } = require("../picacg/picacgServiceFactory")
const path = require('path')
const fs = require('fs');
const { mkdir } = require("../util/dir");
const { resolve } = require("path");
const { getFileBuffer } = require("../util/file");
const { Duplex } = require("stream");

module.exports = class ComicService {

    constructor() {

    }
    /**
     * 获取收藏的漫画
     * @param {number} pagesIndex 
     * @param {Function} callback 
     * @returns Promis
     */
    getComicsInfo(pagesIndex, callback) {
        const pageSize = 10;
        const dao = new ComicCollectionDao();
        dao.queryAll().then(rows => {
            let result = {
                code: 200,
                msg: '获取成功',
                data: {
                    comics: rows.slice(pagesIndex * pageSize, (pagesIndex + 1) * pageSize),
                    pageSize: pageSize,
                    pageCount: Math.ceil(rows.length / pageSize) - 1, // + (rows.length % pageSize == 0 ? 0 : 1),
                    page: Number(pagesIndex)
                }
            };
            callback(result);
        })

    }
    SynchronizeComic(callback) {
        getPicacgService().then(service => {
            this._getAllFavourites(service, []).then(comics => {
                const comicCollection = new ComicCollectionDao();
                comicCollection.queryAll().then(data => {
                    // 查找账号云端数据与本地数据漫画id相等的漫画
                    // TODO similar的漫画逻辑未写
                    let similar = comics.filter(item => data.some(element => {
                        if (element.id === item._id) {
                            if (element.epsCount == item.epsCount ||
                                element.pages == item.pagesCount ||
                                element.title == item.title ||
                                element.author == item.author ||
                                element.path == item.thumb.path ||
                                element.fileServer == item.thumb.fileServer)
                                return true;
                        }
                        return false;
                    }));
                    // 查找存在于账号云端，不存在本地数据库中的漫画
                    let different = comics.filter(item => !data.some(element => element.id === item._id));
                    this._saveNewComic(different).then(() => {
                        callback({
                            code: 200,
                            msg: '更新成功'
                        })
                    }).catch(err => {

                    })
                    this._updateComicFile(this._saveNewComic())
                });
            });
        }).catch(err => {
            console.error(err);
        })
    }

    /**
     * 获取封面buffer
     * @param {string} id 
     * @param {Function} callback 回调
     */
    getCoverBuffer(id, callback) {
        const dao = new ComicCollectionDao();
        dao.query(id).then(rows => {
            // 本地路径
            const coverPath = path.join(DOWNLOAD_DIR, rows[0].id, 'cover.jpg');
            if (fs.existsSync(coverPath))
                // 存在直接读取
                getFileBuffer(coverPath, buffer => {
                    callback(buffer);
                });
            else// 不存在从云端获取再读取返回
                this._saveCover(rows[0], () => {
                    getFileBuffer(coverPath, buffer => {
                        callback(buffer);
                    })
                }, () => {
                    callback(null)
                })
        }).catch(err => {
            callback(null);
        });
    }

    /**
     * 保存从云端拉取的新漫画
     * @param {Comic[]} different 
     * @returns 
     */
    _saveNewComic(different) {
        return new Promise((resolve, reject) => {
            // 遍历未入本地数据库的漫画
            different.forEach(el => {
                // 从云端拉取漫画数据
                service.fetchComic({ id: el._id }).then(comic => {
                    comic = {
                        id: el._id,
                        epsCount: el.epsCount,
                        pages: el.pagesCount,
                        path: el.thumb.path,
                        fileServer: el.thumb.fileServer,
                        title: el.title,
                        author: el.author,
                        categories: comic.categories,
                        creator: comic._creator.name,
                        chineseTeam: comic.chineseTeam,
                        tags: comic.tags,
                        description: comic.description
                    }
                    // 插入数据
                    comicCollection.insert(comic)
                }).catch(err => {
                    console.log(err);
                });
            });
            resolve();
        });
    }

    _updateSimilarComic(similar) {

    }

    /**
     * 回调获取账号收藏的漫画
     * @param {PicaComicService} service 
     * @param {Comic[]} comics 
     * @param {number} index 
     * @returns 
     */
    _getAllFavourites(service, comics, index = 1) {
        return new Promise((resolve, reject) => {
            service.fetchUserFavourites({
                page: index
            }).then(data => {
                let innerComics = [...comics, ...data.docs];
                if (data.page != data.pages) {
                    this._getAllFavourites(service, innerComics, index + 1).then(comics => {
                        resolve(comics);
                    });
                } else {
                    resolve(innerComics);
                }
            }).catch(err => {
                console.error(err);
            });
        });
    }

    // 保存封面
    _updateComicFile(comics) {
        return new Promise((resolve, reject) => {
            if (comics) {
                getPicacgService().then(server => {
                    comics.forEach(comic => {
                        this._saveCover(comic);
                    });
                });
            }
        });
    }
    /**
     * 获取漫画图片并保存
     * @param {Comic} comic 
     * @param {Function} success 成功的回调函数
     * @param {Function} fail 失败的回调函数
     */
    _saveCover(comic, success, fail) {
        getPicacgService().then(server => {
            server.fetchImage({
                path: comic.path || comic.thumb.path,
                fileServer: comic.fileServer || comic.thumb.fileServer
            }).then((image) => {
                mkdir(path.join(DOWNLOAD_DIR, comic.id || comic._id));
                let fd = fs.openSync(path.join(DOWNLOAD_DIR, comic.id, 'cover.jpg'), 'w')
                let ws = fs.createWriteStream(path.join(DOWNLOAD_DIR, comic.id, 'cover.jpg'));
                image.pipe(ws);
                // 监听管道是否关闭，当关闭时才完成传输
                image.on('end', () => success());
                fs.close(fd);
            }).catch(err => {
                fail(err);
            })
        });
    }

    /**
     *  TODO
     *  保存comic信息作为comicInfo.xml至下载目录
     */
    _saveComicInfo() {
        getPicacgService().then(server => {
            server.fetchImage({
                path: comic.path || comic.thumb.path,
                fileServer: comic.fileServer || comic.thumb.fileServer
            }).then((image) => {
                mkdir(path.join(DOWNLOAD_DIR, comic.id || comic._id));
                let fd = fs.openSync(path.join(DOWNLOAD_DIR, comic.id, 'cover.jpg'), 'w')
                let ws = fs.createWriteStream(path.join(DOWNLOAD_DIR, comic.id, 'cover.jpg'));
                image.pipe(ws);
                fs.close(fd);
            })
        });
    }
}
