const fs = require('fs');
const path = require('path');

const getFileBuffer = (path, callback) => {
    if (fs.existsSync(path)) {
        let stream = fs.createReadStream(path);
        let data = [];
        if (stream) {
            stream.on('data', chunk => data.push(chunk));
            stream.on('end', () => callback(Buffer.concat(data)));
        } else
            callback(null)
    } else
        callback(null);
}

exports.getFileBuffer = getFileBuffer;