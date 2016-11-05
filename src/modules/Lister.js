/**
 * The lister module contain the methods to list directories and file.
 */
const fs = require('fs');
const path = require('path');

/**
 * List all content of directory
 * @param  {String} dirPath The absolute path of directory
 * @return {Array|Boolean}  Return the `false` in case of the path is invalid or
 * a file path. In case of success return the Array with all file names and dir names
 */
function getDirContent(dirPath) {
  let dir = path.normalize(dirPath);
  let res = false;

  if (path.isAbsolute(dir) && fs.lstatSync(dir).isDirectory()) {
    // Add the end bar in string on case of not found
    if (dir.substr(dir.length - 1) !== '/') {
      dir += '/';
    }
    // Retrive the all files and directories in content of directory
    res = fs.readdirSync(dir);
  }
  return res;
}


export default class Lister {
  /**
   * List only files presents in `path`
   * @method listFiles
   * @param  {String} path The directory path
   * @return {Array}       List of files presents in directory
   */
  static listFiles(dirPath) {
    const dirContent = getDirContent(dirPath);
    const res = [];
    // Check if `dirContent` is Array
    if (Array.isArray(dirContent)) {
      // Interate the Array to check if is directory, in case success,
      // remove the element from Array
      dirContent.forEach((item) => {
        if (fs.lstatSync(path.normalize(`${dirPath}/${item}`)).isFile()) {
          // Add the file name to `res`
          res.push(item);
        }
      });
    }
    return res;
  }
  /**
   * List only directories presents in `path`
   * @method listDir
   * @param  {String} path The directory path
   * @return {Array}       List of directories presents in directory
   */
  static listDir(dirPath) {
    const dirContent = getDirContent(dirPath);
    const res = [];
    // Check if `dirContent` is Array
    if (Array.isArray(dirContent)) {
      // Interate the Array to check if is file, in case success,
      // remove the element from Array
      dirContent.forEach((item) => {
        if (fs.lstatSync(path.normalize(`${dirPath}/${item}`)).isDirectory()) {
          // Add the directory name to `res`
          res.push(item);
        }
      });
    }
    return res;
  }
  /**
   * List files and directories presents in `path`
   * @method listDir
   * @param  {String} path The directory path
   * @return {Array}       List of directories and files presents in directory
   */
  static listAll(dirPath) {
    return getDirContent(dirPath);
  }
}
