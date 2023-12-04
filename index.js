const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require("url");

// Create Server Object

const server = http.createServer((req, res) => {
    // console.log("Request url: " + req.url); 
    let filePath = path.join(
        __dirname, 'public', req.url === '/' ? 'index.html': req.url + ".html");
        // console.log("File Path: " + filePath); 

    // Extension of file:
    let extname = path.extname(filePath);
    // console.log("Extension name: " + extname); 
    
    // Initial content type
    let contentType = 'text/html';

    // Check ext and set content type
    switch(extname) {
        case '.js':
            contentType = 'text/javascript'
            break;
        case '.css':
            contentType = 'text/css'
            break;
        case '.json':
            contentType = 'application/json'
            break;
        case '.png':
            contentType = 'image/png'
            break;
        case '.jpg':
            contentType = 'image/jpg'
            break;
    }

    // Read File
    fs.readFile(filePath, (err, content) => {
        if(err) { 
            if(err.code == 'ENOENT') {
                // Page Not Found
                fs.readFile(path.join(__dirname, 'public', '404.html'), 
                (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf8');
                })
            } else { 
                // Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Sever running on PORT ${PORT}`));
