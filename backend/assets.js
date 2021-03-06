const path = require('path');
const fs = require('fs');

let files = [];

module.exports = (folder, req, res) => {

    const sendError = (message, code) => {
        if (code === undefined) {
            code = 404;
        }
        res.writeHead(code, { 'Content-Type' : 'text/html' });
        res.end(message);
    };

    const serve = (file) => {
        let contentType;
        switch (file.ext.toLowerCase()) {
            case 'css':
                contentType = 'text/css';
                break;
            case 'html':
                contentType = 'text/html';
                break;
            case 'js':
                contentType = 'application/javascript';
                break;
            case 'ico':
                contentType = 'image/ico';
                break;
            case 'json':
                contentType = 'application/json';
                break;
            case 'jpg':
                contentType = 'image/jpeg';
                break;
            case 'jpeg':
                contentType = 'image/jpeg';
                break;
            case 'png':
                contentType = 'image/png';
                break;
            default:
                contentType = 'text/plain';
        }
        res.writeHead(200, { 'Content-Type' : contentType });
        res.end(file.content);
    };

    const readFile = (filePath) => {
        if (files[filePath]) {
            serve(files[filePath]);
        } else {
            // TODO Make the operation below async
            try {
                const data = fs.readFileSync(filePath, 'UTF-8');
                files[filePath] = {
                    ext: filePath.split('.').pop(),
                    content: data
                }
                serve(files[filePath]);

            } catch (err) {
                sendError('Page not found');
            }
        }
    };

    readFile(path.normalize(folder + req.url));

}