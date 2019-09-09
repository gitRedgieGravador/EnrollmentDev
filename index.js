console.log("Enrollment application Server is running...");
var http = require('http')
var url = require('url');
var fssave = require('./fssave');
var fsread = require('./fsread');

http.createServer(function (request, response) {
    var q = url.parse(request.url, true);
    var filename = "." + q.pathname + "index.html";
    console.log(filename);
    if (q.pathname == "/") {
        fsread.normalRead(filename, response);
    } else if (q.pathname.toLowerCase().slice(0, 6) == "/class") {
        let param = q.pathname.toLowerCase();
        fsread.read(param, response);
    }
    request.on('data', function (data) {
        fssave.save(data);
    });
    request.on('end', function () {
        response.writeHead(200, {
            'Context-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*'
        });
    })
}).listen(8080);