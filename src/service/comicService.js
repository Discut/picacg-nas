const { DOWNLOAD_DIR } = require("../configuration/systemConfig");
const ComicCollectionDao = require("../dao/comicCollection");
const { getPicacgService } = require("../picacg/picacgServiceFactory")
const path = require('path')
const fs = require('fs');
const { mkdir } = require("../util/dir");

module.exports = class ComicService {
    constructor() {

    }
    getComicInfo(callback) {

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
     */
    _saveCover(comic) {
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
