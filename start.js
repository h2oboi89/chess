'use strict';

import { createServer } from 'http';
import { readFile } from 'fs';
import { extname } from 'path';
import { exec } from 'child_process';

const port = 8125;

const server = createServer(function (request, response) {
    let filePath = '.' + request.url;
    if (filePath == './') {
        filePath = './index.html';
    }

    const fileExtension = extname(filePath);
    let contentType = 'text/html';
    switch (fileExtension) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
    }

    readFile(filePath, function (error, content) {
        if (error) {
            if (error.code == 'ENOENT') {
                response.writeHead(400);
                response.end();
            }
            else {
                response.writeHead(500);
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
});

server.listen(port);

const url = `http://127.0.0.1:${port}/`;

console.log(`Server running at ${url}`);

exec(`start ${url}`);