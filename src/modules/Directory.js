import fs from 'fs';
import path from 'path';

export default class Directory {
  /**
   * Initialize the Directory object and initialize variables
   * @param  {String} p The path of directory
   */
  constructor(p) {
    this.files = [];
    this.directories = [];

    if (typeof p === 'string') {
      // Remove double bars and other possible errors in path
      this.path = path.normalize(p);
    } else {
      this.path = '.';
    }

    // Check if is absolute path, case not, convert relative to absolute
    if (!path.isAbsolute(this.path)) {
      this.path = path.join(process.env.PWD, this.path);
    }
    if (!this.path) {
      console.error('The path is invalid', this.path);
    }

    // Check if is directory
    if (fs.lstatSync(this.path).isDirectory()) {
      // Remove the end bar of path in case exists
      const endBarUnix = this.path.substr(this.path.length - 1) === '/' && this.path.length > 1;
      const endBarWin = this.path.substr(this.path.length - 1) === '\\' && this.path.length > 1;
      if (endBarWin || endBarUnix) {
        this.path = this.path.substr(0, this.path.length - 1);
      }
      // Retrive the all files and directories in content of directory
      let res = [];
      res = fs.readdirSync(this.path);

      for (const item of res) {
        if (fs.lstatSync(item).isDirectory()) {
          this.addDirectory(item);
        } else {
          this.addFile(item);
        }
      }
    }
  }

  /**
   * List all files in directory
   * @return {Array} List of files in directory
   */
  getFiles() {
    return this.files;
  }

  /**
   * Add new file to list
   * @param {String} p The path new file
   * @return {Boolean} Return false in case of can't add new file to list
   */
  addFile(p) {
    if (typeof p !== 'string') {
      console.error("Can't add the new file. The `p` is not a string");
      return false;
    }
    let bar = '/';
    if (/^win/.test(process.platform)) {
      bar = '\\';
    }
    const pth = path.normalize(`${this.getPath()}${bar}${p}`);

    if (fs.lstatSync(pth).isFile()) {
      this.files.push(pth.substr(this.path.length + 1));
    }
    return true;
  }

  /**
   * List all directories in directory
   * @return {Array} List of directories in directory
   */
  getDirectories() {
    return this.directories;
  }

  /**
   * Add new directory to list
   * @param {String} p The path new directory
   * @return {Boolean} Return false in case of can't add new directory to list
   */
  addDirectory(p) {
    if (typeof p !== 'string') {
      console.error("Can't add the new directory. The `p` is not a string");
      return false;
    }
    let bar = '/';
    if (/^win/.test(process.platform)) {
      bar = '\\';
    }
    const pth = path.normalize(`${this.getPath()}${bar}${p}`);
    // Check if is real path and if is directory
    if (fs.lstatSync(pth).isDirectory()) {
      this.directories.push(pth.substr(this.path.length + 1));
    }
    return true;
  }

  /**
   * Get the string of path in this directory
   * @return {String} The path
   */
  getPath() {
    return this.path;
  }

  /**
   * List all content of directory
   * @return {Array}  Return the Array with all file names and dir names
   */
  getFilesAndDirectories() {
    return this.directories.concat(this.files);
  }
}
