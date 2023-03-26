const fs = require('fs');
const path = require('path');
/**
 * 迭代创建目录
 */
const _mkdir = (dirname) => {
    console.log(dirname, "-----", path.dirname(dirname))
    if (!fs.existsSync(path.dirname(dirname)))
        _mkdir(path.dirname(dirname))
    fs.mkdirSync(dirname);
}

exports.mkdir = _mkdir;