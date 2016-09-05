/**
 * The lister module contain the methods to list directories and file.
 */

var shell = require('shelljs');

var lister = {
  listFile: function(path) {
    console.log(path);
    var res = shell.ls(path);
    console.log(res);
    return res;
  },
  listDir: function(path) {
    console.log(path);
    var res = shell.ls(path);
    console.log(res);
    return res;
  },
  list: function(path) {
    console.log(path);
    var res = shell.ls(path);
    console.log(res);
    return res;
  }
};

module.exports = lister;
