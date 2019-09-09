
var fs = require('fs');
exports.save = function (data) {
    storage = JSON.parse(data)
    var name = storage.name;
    var email = storage.email;
    var cy = storage.cy;
    var sub = storage.subject.toLowerCase();
    var replaced = sub.split(' ').join('-');
    fs.appendFile(replaced + '.csv', name + "," + email + "," + cy + "\n", function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
};