var fs = require('fs');
exports.read = function (param,response) {
    var len = param.toLowerCase().length;
    var path = param.slice(1, len).split("/");
    var file = path[1] + ".csv";
    filename = file.toString();
    fs.readFile(filename, "utf8", function (err, data) {
        if (err) {
            response.writeHead(404, { 'Content-Type': 'text/html' });
            return response.end("404 Not Found");
        }
        var tr = "<tbody>"
        var closer = "</tbody></table></body></html>"
        var table = "<html><head><title>Document</title>" +
            '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">' +
            "<style>" +
            " table{width: 100%;margin: 20px 0;border-collapse: collapse;}" +
            "table, th, td{border-bottom: 1px solid black;color: black;}" +
            "table th, table td{padding: 5px;text-align: left;}" +
            "thead {font-size:20px;font-family:times new roman}"+
            "tr:hover {background-color:rgba(91, 224, 245,0.4);}</style>" +
            "<body><center><h1>"+"List of Students:\n"+path[1].toUpperCase()+"<h1></center><div class='container'><div class = 'jumbotron'+ ><table><tr><thead><td>Name</td><td>Email</td><td>Course</td></tr></thead>";
        var a = data.split('\n').join(',');
        var b = a.split(',');
        var counter = 0;
        var len = b.length - 1;
        for (var i = 0; i < len / 3; ++i) {
            tr += "<tr><td>" + b[counter] + "</td><td>" + b[counter + 1] + "</td><td>" + b[counter + 2] +  "</td>";
            counter += 3;
        }
        table += tr + closer;
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(table);
    });
};

exports.normalRead = function(filename, response){
    fs.readFile(filename, function (err, data) {
        if (err) {
            response.writeHead(404, { 'Content-Type': 'text/html' });
            return response.end("404 Not Found");
        }
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        return response.end();
    });
}