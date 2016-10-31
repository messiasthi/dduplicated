/**
 * The lister module contain the methods to list directories and file.
 */
const shell = require('shelljs');
const fs = require('fs');

export default class Lister {

  /**
   * List only files presents in `path`
   * @method listFiles
   * @param  {String} path The directory path
   * @return {Array}       List of files presents in directory
   */
  static listFiles(path) {
    // console.log(path);
    const res = [];
    fs.readdir(path, (err, files) => {
      files.forEach((file) => {
        res.push(file);
      });
    });
    // console.log(res);
    return res;
  }

  static listDir(path) {
    console.log(path);
    const res = shell.ls(path);
    console.log(res);
    return res;
  }

  static list(path) {
    console.log(path);
    const res = shell.ls(path);
    console.log(res);
    return res;
  }
}
