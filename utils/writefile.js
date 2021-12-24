const fs = require("fs");

function writefile(path, data, callback) {
  fs.writeFile(path, data, callback);
}

module.exports = writefile;
