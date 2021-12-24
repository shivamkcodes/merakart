const fs = require("fs");

function readfile(path, callback) {
  fs.readFile(path, "utf-8", callback);

  //   fs.readFile(path, "utf-8", (err, data) => {
  //     callback(err, data);
  //   });
}

module.exports = readfile;
